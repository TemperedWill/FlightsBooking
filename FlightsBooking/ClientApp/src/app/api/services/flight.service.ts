/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FlightRm } from '../models/flight-rm';
@Injectable({
  providedIn: 'root',
})
class FlightService extends __BaseService {
  static readonly FindFlightPath = '/Flight/{id}';
  static readonly SearchFlightPath = '/Flight';

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
}

module FlightService {
}

export { FlightService }
