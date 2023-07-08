import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FlightService} from "../api/services/flight.service";
import {FlightRm} from "../api/models/flight-rm";
import {AuthService} from "../auth/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {BookDto} from "../api/models/book-dto";

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private flightService: FlightService,
              private authService: AuthService,
              private fb: FormBuilder) { }

  flightId: string = 'not loaded';
  flight: FlightRm = {};

  form = this.fb.group({
    number: [1, Validators.compose([Validators.required, Validators.min(1), Validators.max(254)])]
  })

  ngOnInit(): void {
    this.route.paramMap.subscribe(p=> this.findFlight(p.get("flightId")));
  }

  private findFlight = (flightId: string | null)=>{
    this.flightId = flightId ?? 'not passed';
    this.flightService.FindFlight(this.flightId).subscribe(flight => this.flight = flight, this.handleError);
  }

  private handleError = (err: any) =>{

    if(err.status == 404){
      alert("Flight not found!")
      this.router.navigate(['/search-flights'])
    }
    if (err.status == 409) {
      console.log("err: " + err.error.message);
      alert(err.error.message);
    }
    console.log("Response error. Status: ", err.status)
    console.log("Response error. Status text: ", err.status)
    console.log(err)
  }

  book() {
    if(this.form.invalid) return;

    console.log(`Booking ${this.form.get('number')?.value} passengers for the flight ${this.flightId}`);

    const booking : BookDto = {
      flightId: this.flight.id,
      passengerEmail: this.authService.currentUser?.email,
      numberOfSeats: this.form.get('number')?.value!
    }

    this.flightService.BookFlight(booking)
      .subscribe({next: _=> this.router.navigate(['/my-bookings']), error:this.handleError});
  }

  get number(){
    return this.form.controls.number;
  }
}


