import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent implements OnInit {

  searchResult : FlightRm[] = [
    {
      airline: "American Airlines",
      remainingSeats: 100,
      departure: {time: Date.now().toString(), place: "New York"},
      arrival: {time: Date.now().toString(), place: "Moscow"},
      price: "400",
    },
    {
      airline: "British Airways",
      remainingSeats: 120,
      departure: {time: Date.now().toString(), place: "London"},
      arrival: {time: Date.now().toString(), place: "Moscow"},
      price: "400",
    },
    {
      airline: "German Airlines",
      remainingSeats: 130,
      departure: {time: Date.now().toString(), place: "New York"},
      arrival: {time: Date.now().toString(), place: "Frankfurt"},
      price: "440",
    },
    {
      airline: "American Airlines",
      remainingSeats: 100,
      departure: {time: Date.now().toString(), place: "Moscow"},
      arrival: {time: Date.now().toString(), place: "New York"},
      price: "370",
    },
    {
      airline: "American Airlines",
      remainingSeats: 100,
      departure: {time: Date.now().toString(), place: "New York"},
      arrival: {time: Date.now().toString(), place: "Moscow"},
      price: "400",
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}

export interface FlightRm{
  airline: string;
  arrival: TimePlaceRm;
  departure: TimePlaceRm;
  price: string;
  remainingSeats: number;
}
export interface TimePlaceRm{
  place: string;
  time: string;
}
