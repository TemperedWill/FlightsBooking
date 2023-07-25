using System.Collections;
using FlightsBooking.Data;
using FlightsBooking.ReadModels;
using FlightsBooking.Domain.Entities;
using FlightsBooking.Domain.Errors;
using Microsoft.AspNetCore.Mvc;
using FlightsBooking.Dtos;
using Microsoft.EntityFrameworkCore;


namespace FlightsBooking.Controllers {
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ApiController]
    [Route("[controller]")]
    public class FlightController : ControllerBase {
        
        private readonly ILogger<FlightController> _logger;
        private readonly Entities _entities;

        public FlightController(ILogger<FlightController> logger,
            Entities entities) {
            _logger = logger;
            _entities = entities;
        }

        
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(FlightRm), 200)]
        [HttpGet("{id}")]
        public ActionResult<FlightRm> Find(Guid id) {
            var flight = _entities.Flights.SingleOrDefault(f => f.Id == id);
            if (flight == null) return NotFound();

            var readModel = new FlightRm(
                flight.Id,
                flight.Airline,
                flight.Price,
                new TimePlaceRm(flight.Departure.Place.ToString(), flight.Departure.Time),
                new TimePlaceRm(flight.Arrival.Place.ToString(), flight.Arrival.Time),
                flight.RemainingSeats
            );

            return Ok(flight);
        }

        
        [ProducesResponseType(typeof(IEnumerable<FlightRm>), 200)]
        [HttpGet]
        public IEnumerable<FlightRm> Search([FromQuery] FlightSearchParameters @params) {   // We grab params from query string from GET URL
            
            _logger.LogInformation("searching for flight with destination: {destination}", @params.Destination);

            IQueryable<Flight> flights = _entities.Flights;
            
            // Adding search parameters 
            if (!string.IsNullOrWhiteSpace(@params.From))
                flights = flights.Where(f => f.Departure.Place.Contains(@params.From));

            if (!string.IsNullOrWhiteSpace(@params.Destination)) //rename destination into To?
                flights = flights.Where(f => f.Arrival.Place.Contains(@params.Destination));

            if (@params.FromDate != null)
                flights = flights.Where(f => f.Departure.Time >= @params.FromDate.Value.Date);

            if (@params.ToDate != null)
                flights = flights.Where(f => f.Departure.Time <= @params.ToDate.Value.Date.AddDays(1).AddTicks(-1));

            if (@params.NumberOfPassengers != null && @params.NumberOfPassengers != 0)
                flights = flights.Where(f => f.RemainingSeats >= @params.NumberOfPassengers);
            else
                flights = flights.Where(f => f.RemainingSeats >= 1);
            
            
            
            var flightRmList = flights.Select(flight => new FlightRm(
                flight.Id,
                flight.Airline,
                flight.Price,
                new TimePlaceRm(flight.Departure.Place.ToString(), flight.Departure.Time),
                new TimePlaceRm(flight.Arrival.Place.ToString(), flight.Arrival.Time),
                flight.RemainingSeats
            ));

            return flightRmList;
        }

        
        [HttpPost]
        [ProducesResponseType(404)]
        [ProducesResponseType(200)]
        public IActionResult Book(BookDto dto) {
            System.Diagnostics.Debug.WriteLine($"Booking a new flight {dto.FlightId}");

            var flight = _entities.Flights.SingleOrDefault(f => f.Id == dto.FlightId);

            if (flight == null)
                return NotFound();

            var error = flight.MakeBooking(dto.PassengerEmail, dto.NumberOfSeats);

            if (error is OverbookError)
                return Conflict(new { message = "Количество запрашиваемых мест превышает количество свободных." });

            try {
                _entities.SaveChanges();
            }
            catch (DbUpdateConcurrencyException e) {
                return Conflict(new { message = "Возникла ошибка при регистрации полета, попробуйте снова" });
            }

            return CreatedAtAction(nameof(Find), new { id = dto.FlightId });
        }
    }
}