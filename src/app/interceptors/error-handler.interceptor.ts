import { inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap } from 'rxjs';
import { HttpAuthService } from '../services/http/auth/http-auth.service';

export class ErrorHandlerInterceptor implements HttpInterceptor {
  #http = inject(HttpAuthService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(catchError((error) => {
      if((<HttpErrorResponse>error).status === 401){
        return this.#http.getRefreshToken().pipe(switchMap(() => next.handle(request)))
      }
    } ))
  }
}
