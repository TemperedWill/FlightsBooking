FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["FlightsBooking/FlightsBooking.csproj", "FlightsBooking/"]
RUN dotnet restore "FlightsBooking/FlightsBooking.csproj"
COPY . .
WORKDIR "/src/FlightsBooking"
RUN dotnet build "FlightsBooking.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FlightsBooking.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY /src/FlightsBooking/bin/Release/net6.0/FlightsBooking.dll .
ENTRYPOINT ["dotnet", "FlightsBooking.dll"]
