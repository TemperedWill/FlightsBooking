namespace FlightsBooking.Dtos;

public record BookDto(Guid FlightId, 
                    string PassengerEmail,
                    byte NumberOfSeats);