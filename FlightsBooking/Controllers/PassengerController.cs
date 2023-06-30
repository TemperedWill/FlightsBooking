using FlightsBooking.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FlightsBooking.Dtos; 
using FlightsBooking.ReadModels;

namespace FlightsBooking.Controllers;

[Route("[controller]")]
[ApiController]
public class PassengerController : ControllerBase
{
    static private IList<Passenger> Passengers = new List<Passenger>();

    [HttpPost]
    [ProducesResponseType(201)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public IActionResult Register(NewPassengerDto passengerDto)
    {
        Passengers.Add(new Passenger(passengerDto.Email, passengerDto.FirstName, passengerDto.LastName, passengerDto.isFemale)); //Тут наверное по хорошему надо бы вставлять в массив саму модель а не DTO?
        System.Diagnostics.Debug.WriteLine(Passengers.Count);
        return CreatedAtAction(nameof(Find), new {email = passengerDto.Email});
    }

    [HttpGet("{email}")]
    [ProducesResponseType(404)]
    [ProducesResponseType(200)]
    public ActionResult<PassengerRm> Find(string email)
    {
        var passenger = Passengers.FirstOrDefault(x => x.Email == email);
        if (passenger == null) return NotFound();
        var rm = new PassengerRm(
            passenger.Email,
            passenger.FirstName,
            passenger.LastName,
            passenger.isFemale);
        return Ok(rm);

    }
}