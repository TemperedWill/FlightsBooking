import {Component, OnInit} from '@angular/core';
import {BookingRm, BookDto} from "../api/models";
import {BookingService} from "../api/services/booking.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  bookings!: BookingRm[];
  constructor(private bookingService: BookingService,
              private authService: AuthService,
              ) {
  }

  ngOnInit(): void {
    this.bookingService.ListBooking(this.authService.currentUser?.email! ?? '').subscribe({next: r => this.bookings = r, error: this.handleError});
  }

  private handleError(err: any) {
    console.log("Response error. Status: ", err.status)
    console.log("Response error. Status text: ", err.statusText)
    console.log(err)
  }

  cancel(booking: BookingRm){
    const dto: BookDto={
      flightId: booking.flightId,
      numberOfSeats: booking.numberOfBookedSeats,
      passengerEmail: booking.passengerEmail,
    };

    this.bookingService.CancelBooking(dto).subscribe({next: _ => {this.bookings = this.bookings.filter(b=> b!= booking)}, error: this.handleError});
  }
}
