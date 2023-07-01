using FlightsBooking.Domain.Entities;

namespace FlightsBooking.Data;

public class Entities
{
    public IList<Passenger> Passengers = new List<Passenger>(); 

    public List<Flight> Flights = new List<Flight>();

}