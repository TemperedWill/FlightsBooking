/* tslint:disable */
import { TimePlaceRm } from './time-place-rm';
export interface FlightRm {
  airline?: string;
  arrival?: TimePlaceRm;
  departure?: TimePlaceRm;
  id?: string;
  price?: string;
  remainingSeats?: number;
}
