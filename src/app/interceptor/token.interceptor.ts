import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthServiceService } from '../auth/auth-service.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthServiceService, private router: Router) {}

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //   const accessToken = localStorage.getItem('accessToken');

  //   const cloneReq = req.clone({
  //       headers: req.headers.set('Authorization', 'Bearer ' + accessToken)
  //   });
  //   return next.handle(cloneReq);
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = localStorage.getItem('accessToken');
    let clonedRequest = request;

    if (token) {
      clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(clonedRequest).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized errors
          // localStorage.clear();
          this.authService.setLoggedIn(false);
          this.router.navigateByUrl('/login');
        }
        return throwError(error);
      })
    );
  }

}
