using FlightsBooking.Domain.Errors;
using Microsoft.AspNetCore.Mvc;

namespace FlightsBooking.Domain.Entities;

public record Flight(
    Guid Id,
    string Airline,
    string Price,
    TimePlace Departure,
    TimePlace Arrival,
    int RemainingSeats
)
{
    public IList<Booking> Bookings = new List<Booking>();

    public int RemainingSeats { get; set; } = RemainingSeats;

    public object? MakeBooking(string PassengerEmail, byte NumberOfSeats) //TODO: Сделать чтобы ошибки наследовались от одного класса 
    {
        if (RemainingSeats < NumberOfSeats)
            return new OverbookError();

        Bookings.Add(new Booking(
            PassengerEmail,
            NumberOfSeats
        ));
        RemainingSeats -= NumberOfSeats;
        
        return null;
    }
};