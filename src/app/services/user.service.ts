import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { HttpAuthService } from './http/auth/http-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser$ = new BehaviorSubject<User>(null);
  http = inject(HttpAuthService);

  getUser(){
    return this.http.getUser();
  }

  // played(){
  //   this.played$.next(null);
  // }
}
