/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { NewPassengerDto } from '../models/new-passenger-dto';
@Injectable({
  providedIn: 'root',
})
class PassengerService extends __BaseService {
  static readonly RegisterPassengerPath = '/Passenger';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param body undefined
   */
  RegisterPassengerResponse(body?: NewPassengerDto): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Passenger`,
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
  RegisterPassenger(body?: NewPassengerDto): __Observable<null> {
    return this.RegisterPassengerResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module PassengerService {
}

export { PassengerService }
