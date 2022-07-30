import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor() {}



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token');
    const companyId: string = localStorage.getItem('company');
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
      req = req.clone({
        headers: req.headers.set('companyId', companyId),
      });
    }
    return next.handle(req);
  }
}
