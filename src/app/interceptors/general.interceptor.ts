import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GeneralInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let modifiedRequest: HttpRequest<unknown>;
    if(request.url.startsWith('https://api')){
      modifiedRequest = request.clone({setHeaders: {'Authorization':`Bearer ${localStorage.getItem('access_token')}`}})
    return next.handle(modifiedRequest);
    }else{
      return next.handle(request);
    }
  }
}
