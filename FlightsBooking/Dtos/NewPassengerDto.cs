namespace FlightsBooking.Dtos;

public record NewPassengerDto(string Email, string FirstName, string LastName, bool isFemale);