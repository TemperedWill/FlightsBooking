using FlightsBooking.Data;
using FlightsBooking.ReadModels;
using Microsoft.AspNetCore.Mvc;
using FlightsBooking.Dtos;
using FlightsBooking.Domain.Errors;
using Microsoft.AspNetCore.Authorization;

namespace FlightsBooking.Controllers;

[Route("[controller]")]
[ApiController]
public class BookingController : ControllerBase
{
    private readonly Entities _entities;

    public BookingController(Entities entities)
    {
        _entities = entities;
    }

    [Authorize]
    [HttpGet("{email}")]
    [ProducesResponseType(500)]
    [ProducesResponseType(400)]
    [ProducesResponseType(typeof(IEnumerable<BookingRm>),200)]
    public ActionResult<IEnumerable<BookingRm>> List(string email)
    {
        var bookings = _entities.Flights.ToArray()
            .SelectMany(f =>
                f.Bookings.Where(b =>
                    b.PassengerEmail == email).Select(b=>new BookingRm(
                    f.Id,
                    f.Airline,
                    f.Price.ToString(),
                    new TimePlaceRm(f.Arrival.Place, f.Arrival.Time),
                    new TimePlaceRm(f.Departure.Place, f.Departure.Time),
                    b.NumberOfSeats,
                    b.PassengerEmail))); //TODO: Remove ToArray call when switching to SQL database
        return Ok(bookings);
    }   //TODO: btw this model from the course is not optimised for working with user bookings at all, have to look into that further later

    [HttpDelete]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public IActionResult Cancel(BookDto bookDto)
    {
        var flight = _entities.Flights.Find(bookDto.FlightId);

        var error = flight?.CancelBooking(bookDto.PassengerEmail, bookDto.NumberOfSeats);

        if (error == null)
        {
            _entities.SaveChanges();
            return NoContent();
        }

        if (error is NotFoundError)
        {
            return NotFound();
        }

        throw new Exception($"Unhandled exception of type: {error.GetType().Name} occured while canceling booking {bookDto.PassengerEmail} {bookDto.NumberOfSeats}");
    }
   
}