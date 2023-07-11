/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FlightRm } from '../models/flight-rm';
import { BookDto } from '../models/book-dto';
@Injectable({
  providedIn: 'root',
})
class FlightService extends __BaseService {
  static readonly FindFlightPath = '/Flight/{id}';
  static readonly SearchFlightPath = '/Flight';
  static readonly BookFlightPath = '/Flight';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param id undefined
   * @return Success
   */
  FindFlightResponse(id: string): __Observable<__StrictHttpResponse<FlightRm>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Flight/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FlightRm>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  FindFlight(id: string): __Observable<FlightRm> {
    return this.FindFlightResponse(id).pipe(
      __map(_r => _r.body as FlightRm)
    );
  }

  /**
   * @param params The `FlightService.SearchFlightParams` containing the following parameters:
   *
   * - `toDate`:
   *
   * - `numberOfPassengers`:
   *
   * - `fromDate`:
   *
   * - `from`:
   *
   * - `destination`:
   *
   * @return Success
   */
  SearchFlightResponse(params: FlightService.SearchFlightParams): __Observable<__StrictHttpResponse<Array<FlightRm>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.toDate != null) __params = __params.set('toDate', params.toDate.toString());
    if (params.numberOfPassengers != null) __params = __params.set('numberOfPassengers', params.numberOfPassengers.toString());
    if (params.fromDate != null) __params = __params.set('fromDate', params.fromDate.toString());
    if (params.from != null) __params = __params.set('from', params.from.toString());
    if (params.destination != null) __params = __params.set('destination', params.destination.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Flight`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<FlightRm>>;
      })
    );
  }
  /**
   * @param params The `FlightService.SearchFlightParams` containing the following parameters:
   *
   * - `toDate`:
   *
   * - `numberOfPassengers`:
   *
   * - `fromDate`:
   *
   * - `from`:
   *
   * - `destination`:
   *
   * @return Success
   */
  SearchFlight(params: FlightService.SearchFlightParams): __Observable<Array<FlightRm>> {
    return this.SearchFlightResponse(params).pipe(
      __map(_r => _r.body as Array<FlightRm>)
    );
  }

  /**
   * @param body undefined
   */
  BookFlightResponse(body?: BookDto): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Flight`,
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
  BookFlight(body?: BookDto): __Observable<null> {
    return this.BookFlightResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module FlightService {

  /**
   * Parameters for SearchFlight
   */
  export interface SearchFlightParams {
    toDate?: string;
    numberOfPassengers?: number;
    fromDate?: string;
    from?: string;
    destination?: string;
  }
}

export { FlightService }
