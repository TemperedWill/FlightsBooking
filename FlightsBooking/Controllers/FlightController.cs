using System.Collections;
using FlightsBooking.Data;
using FlightsBooking.ReadModels;
using FlightsBooking.Domain.Entities;
using FlightsBooking.Domain.Errors;
using Microsoft.AspNetCore.Mvc;
using FlightsBooking.Dtos;


namespace FlightsBooking.Controllers
{
    
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ApiController]
    [Route("[controller]")]
    public class FlightController : ControllerBase
    {
        private readonly ILogger<FlightController> _logger;
        
        private readonly Entities _entities;
        public FlightController(ILogger<FlightController> logger, 
            Entities entities)
        {
            _logger = logger;
            this._entities = entities;
        }

        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(FlightRm),200)]
        [HttpGet("{id}")]
        public ActionResult<FlightRm> Find(Guid id) 
        {
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
        public IEnumerable<FlightRm> Search()
        {
            var flightRmList = _entities.Flights.Select(flight => new FlightRm(
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
        public IActionResult Book(BookDto dto)
        {
            System.Diagnostics.Debug.WriteLine($"Booking a new flight {dto.FlightId}");

            var flight = _entities.Flights.SingleOrDefault(f => f.Id == dto.FlightId);

            if (flight == null)
                return NotFound();
            
            var error = flight.MakeBooking(dto.PassengerEmail, dto.NumberOfSeats);

            if (error is OverbookError)
                return Conflict(new { message = "Количество запрашиваемых мест превышает количество свободных."});
            return CreatedAtAction(nameof(Find), new { id = dto.FlightId });
            
        }

    }
}