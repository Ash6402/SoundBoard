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
  offset = 0;
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let modifiedRequest;
    if(request.url.startsWith('https://api')){
      modifiedRequest = request.clone({setHeaders: {'Authorization':`Bearer ${localStorage.getItem('access_token')}`}})
      if(request.url.endsWith('tracks')){      
        modifiedRequest = modifiedRequest.clone({setParams: {'offset' : this.offset}})
        this.offset += 50;
      }
    return next.handle(modifiedRequest);
    }else{
      return next.handle(request);
    }
  }
}
