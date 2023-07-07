import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private http = inject(HttpService);
  private userService = inject(UserService);
  private subscription: Subscription;
  user: User;

  ngOnInit(): void {
    
    const code = this.route.snapshot.queryParams['code'];
    // this.http.getRefreshToken();
    // this.http.getAccessToken(code);
   
    this.http.getUser();
    this.subscription = this.userService.userSubject.subscribe(
    user => {
      this.user = user;
    }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
