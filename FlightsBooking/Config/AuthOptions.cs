using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace FlightsBooking.Config;

public class AuthOptions {
    public const string TOKEN_ISSUER = "MainServer"; // Издатель токена
    public const string TOKEN_AUDIENCE = "FrontEndClient"; // Юзер токена
    const string KEY = "mysupersecret_secretkey!123"; // Ключ шифрования

    public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
}