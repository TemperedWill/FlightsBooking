/* tslint:disable */
import { TimePlaceRm } from './time-place-rm';
export interface BookingRm {
  airline?: string;
  arrival?: TimePlaceRm;
  departure?: TimePlaceRm;
  flightId?: string;
  numberOfBookedSeats?: number;
  passengerEmail?: string;
  price?: string;
}
