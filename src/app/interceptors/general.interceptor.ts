import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GeneralInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request.url);
    if(request.url.startsWith('https://api')){
    let modifiedRequest = request.clone({setHeaders: {'Authorization':`Bearer ${localStorage.getItem('access_token')}`}})
    return next.handle(modifiedRequest);
    }else{
      return next.handle(request);
    }
  }
}
