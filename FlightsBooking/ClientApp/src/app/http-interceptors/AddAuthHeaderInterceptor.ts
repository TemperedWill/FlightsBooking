import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Injectable()
export class AddAuthHeaderInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const clonedRequest = req.clone({headers: req.headers.append('Authorization', 'Bearer ' + this.authService.getToken())});

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}

// Это интерсептор, перехватывающий исходящие запросы и добавляющий к ним новый header
//
// После создания его надо зарегистрировать в файле AppModule
//
