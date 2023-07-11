import { Component, OnInit } from '@angular/core';
import { FlightService } from "../api/services/flight.service";
import { FlightRm } from "../api/models/flight-rm";
import {FormBuilder, FormControl} from "@angular/forms";


@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent implements OnInit {

  searchResult : FlightRm[] = [
  ]
  constructor(private flightService: FlightService,
              private fb: FormBuilder) {
  }

  searchForm = this.fb.group({
      from: new FormControl('', {nonNullable: true}),
      destination: new FormControl('', {nonNullable: true}),
      fromDate: new FormControl('', {nonNullable: true}),
      toDate: new FormControl('', {nonNullable: true}),
      numberOfPassengers: new FormControl(1, {nonNullable: true}),
  })
  ngOnInit(): void {
    this.search();
  }

  search(){
    this.flightService.SearchFlight(this.searchForm.value)
      .subscribe(response => this.searchResult = response,
      this.handleError)
  }

  private handleError(err: any){


    console.log("Response error. Status: ", err.status)
    console.log("Response error. Status text: ", err.status)
    console.log(err)
  }
}


