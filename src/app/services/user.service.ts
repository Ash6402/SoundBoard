import { Injectable, inject } from '@angular/core';
import { HttpAuthService } from './http/auth/http-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpAuthService);

  getUser(){
    return this.http.getUser();
  }
}
