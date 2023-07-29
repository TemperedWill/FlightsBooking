/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { BookingRm } from '../models/booking-rm';
import { BookDto } from '../models/book-dto';
@Injectable({
  providedIn: 'root',
})
class BookingService extends __BaseService {
  static readonly ListBookingPath = '/Booking/{email}';
  static readonly CancelBookingPath = '/Booking';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param email undefined
   * @return Success
   */
  ListBookingResponse(email: string): __Observable<__StrictHttpResponse<Array<BookingRm>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Booking/${encodeURIComponent(String(email))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<BookingRm>>;
      })
    );
  }
  /**
   * @param email undefined
   * @return Success
   */
  ListBooking(email: string): __Observable<Array<BookingRm>> {
    return this.ListBookingResponse(email).pipe(
      __map(_r => _r.body as Array<BookingRm>)
    );
  }

  /**
   * @param body undefined
   */
  CancelBookingResponse(body?: BookDto): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/Booking`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param body undefined
   */
  CancelBooking(body?: BookDto): __Observable<null> {
    return this.CancelBookingResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module BookingService {
}

export { BookingService }
