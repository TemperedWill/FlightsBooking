namespace FlightsBooking.Domain.Entities;
using System.ComponentModel.DataAnnotations;

public record Booking(
                    [Required][EmailAddress][StringLength(100, MinimumLength = 3)] string PassengerEmail,
                    [Required][Range(1,254)] byte NumberOfSeats);