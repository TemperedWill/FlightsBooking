using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using FlightsBooking.Config;
using FlightsBooking.Data;
using FlightsBooking.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FlightsBooking.Dtos;
using FlightsBooking.ReadModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.IdentityModel.Tokens;

namespace FlightsBooking.Controllers;

[Route("[controller]/[action]")]
[ApiController]
public class PassengerController : ControllerBase {
    private readonly Entities _entities;

    public PassengerController(Entities entities) {
        _entities = entities;
    }

    [HttpPost]
    [ProducesResponseType(201)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public IActionResult Register(NewPassengerDto passengerDto) {
        _entities.Passengers.Add(new Passenger(passengerDto.Email, passengerDto.FirstName, passengerDto.LastName,
            passengerDto.isFemale)); //Тут наверное по хорошему надо бы вставлять в массив саму модель а не DTO?
        _entities.SaveChanges();
        return CreatedAtAction(nameof(Find), new { email = passengerDto.Email });
    }


    [HttpGet("{email}")]
    [ProducesResponseType(404)]
    [ProducesResponseType(200)]
    public ActionResult<PassengerRm> Find(string email) {
        var passenger = _entities.Passengers.FirstOrDefault(x => x.Email == email);
        if (passenger == null) return NotFound();

        var rm = new PassengerRm(
            passenger.Email,
            passenger.FirstName,
            passenger.LastName,
            passenger.isFemale);
        return Ok(rm);
    }

    // Attempt authenticating user using email and password? //TODO: add password to auth
    [HttpGet("{email}")] // TODO: Заменить GET на POST?
    [ProducesResponseType(404)]
    [ProducesResponseType(200)]
    public ActionResult<LoginRm> Login(string email) { 
        var passenger = _entities.Passengers.FirstOrDefault(x => x.Email == email);
        if (passenger == null) return NotFound();

        var rm = new PassengerRm(
            passenger.Email,
            passenger.FirstName,
            passenger.LastName,
            passenger.isFemale); // TODO: Сделать проверку пароля
        
        // List of claims, containing important info about user, be careful with it, as it can easily inflate your JWT token
        var claims = new List<Claim> { new Claim(ClaimTypes.Name, passenger.Email), new Claim(ClaimTypes.Role, "Manager"), new Claim(ClaimTypes.Role, "FlightPassenger"), new Claim(ClaimTypes.Role, "Admin"),};
        
        // создаем JWT-токен
        var jwt = new JwtSecurityToken(
            issuer: AuthOptions.TOKEN_ISSUER,
            audience: AuthOptions.TOKEN_AUDIENCE,
            claims: claims,
            expires: DateTime.UtcNow.Add(TimeSpan.FromDays(1)),
            signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(),
                SecurityAlgorithms.HmacSha256));

        // Упаковываем токен с данными о пользователе
        var loginRm = new LoginRm(new JwtSecurityTokenHandler().WriteToken(jwt), rm);  
        
        return Ok(loginRm);
    }
}