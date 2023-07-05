using FlightsBooking.Domain.Errors;
using Microsoft.AspNetCore.Mvc;

namespace FlightsBooking.Domain.Entities;

public class Flight
{
    public Guid Id { get; set; }
    public string Airline { get; set; }
    public string Price { get; set; }
    public TimePlace Departure { get; set; }
    public TimePlace Arrival { get; set; }
    public int RemainingSeats { get; set; }
    
    public IList<Booking> Bookings = new List<Booking>();

    public Flight()
    {
        
    }
    public Flight(
        Guid id,
        string airline,
        string price,
        TimePlace departure,
        TimePlace arrival,
        int remainingSeats)
    {
         Id = id; 
         Airline = airline; 
         Price = price;
         Departure = departure;
         Arrival = arrival; 
         RemainingSeats = remainingSeats;
    }

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
    
    public object? CancelBooking(string passengerEmail, byte numberOfSeats) //TODO: ok, но это уже прям совсем странное решение пихать такое в тутор
        {                                                                   //TODO: модель надо переписать и удалять резервацию по ID полета и ID резервации, а не так как это делается сейчас
            var booking = Bookings.FirstOrDefault(b =>
                b.NumberOfSeats == numberOfSeats && passengerEmail.ToLower() == b.PassengerEmail.ToLower());

            if (booking == null)
                return new NotFoundError();
            
            Bookings.Remove(booking);
            RemainingSeats += booking.NumberOfSeats;

            return null; //TODO наверное лучше делать через статусы, и от них уже наследовать ошибки?
        } 
};