namespace FlightsBooking.Domain.Entities;
using System.ComponentModel.DataAnnotations;

public record Passenger(
                                [Required][EmailAddress][StringLength(100, MinimumLength = 3)] string Email,
                                [Required][StringLength(40, MinimumLength = 2)] string FirstName, 
                                [Required][MinLength(2)][MaxLength(40)] string LastName, //Just another way of doing the thing on the top 
                                [Required] bool isFemale); //Those validations only work automatically on [ApiController] controllers