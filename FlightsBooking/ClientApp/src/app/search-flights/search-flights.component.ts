import { Component, OnInit } from '@angular/core';
import { FlightService } from "../api/services/flight.service";
import { FlightRm } from "../api/models/flight-rm";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent implements OnInit {

  searchResult : FlightRm[] = [
  ]
  constructor(private flightService: FlightService,
              private router: Router) {

  }
  ngOnInit(): void {

  }

  search(){
    this.flightService.SearchFlight().subscribe(response => this.searchResult = response,
      this.handleError)
  }

  private handleError(err: any){


    console.log("Response error. Status: ", err.status)
    console.log("Response error. Status text: ", err.status)
    console.log(err)
  }
}


