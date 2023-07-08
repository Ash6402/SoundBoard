import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User;
  userSubject = new Subject<User>();

  set user(user: User){
    this.currentUser = user;
    this.userSubject.next(user);
  }

  get user(){
    return this.currentUser;
  }
}
