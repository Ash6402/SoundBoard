import { inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpAuthService } from '../services/http/auth/http-auth.service';

export class ErrorHandlerInterceptor implements HttpInterceptor {
  private router = inject(Router);
  #http = inject(HttpAuthService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(catchError((error) => {
      console.log(error);
      if((<HttpErrorResponse>error).status === 401){
        // localStorage.removeItem('access_token');
        // this.router.navigate(['get-started']);
        return this.#http.getRefreshToken().pipe(switchMap(() => next.handle(request)))
      }
    } ))
  }
}
