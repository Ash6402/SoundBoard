import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class GeneralInterceptor implements HttpInterceptor {

  loader = inject(LoaderService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    this.loader.fetching()
    let modifiedRequest: HttpRequest<unknown>;

    if(request.url.startsWith('https://api')){
      modifiedRequest = request.clone({setHeaders: {'Authorization':`Bearer ${localStorage.getItem('access_token')}`}})
      return next.handle(modifiedRequest).pipe(
        finalize(() => this.loader.complete())
      )
    }else{
      return next.handle(request).pipe(
        finalize(() => this.loader.complete())
      )
    }
  }
}
