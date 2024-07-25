import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const accessToken = localStorage.getItem('accessToken')
    //console.log("interceptor token", accessToken)
    const cloneReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken)
    });
    //console.log("cloneReq",cloneReq)
    return next.handle(cloneReq);
  }
}
