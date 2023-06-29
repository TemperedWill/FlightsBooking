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
   * @return Success
   */
  SearchFlightResponse(): __Observable<__StrictHttpResponse<Array<FlightRm>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
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
   * @return Success
   */
  SearchFlight(): __Observable<Array<FlightRm>> {
    return this.SearchFlightResponse().pipe(
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
}

export { FlightService }
