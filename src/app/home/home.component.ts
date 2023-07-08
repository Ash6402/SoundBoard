import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Subscription, interval, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SavedTracks } from '../models/saved-tracks.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpService);
  private userService = inject(UserService);
  private subscription: Subscription;
  user: User;
  savedTracks: SavedTracks;

  ngOnInit(): void {
    
    const code = this.route.snapshot.queryParams['code'];
    this.getTokenAndGetUser(code);
    this.http.getUser();
    this.refresher();
    this.http.getSavedTracks().subscribe({
      next:  response => {
        this.savedTracks = response;
        console.log(response);
      },
    })
    this.subscription = this.userService.userSubject.subscribe(
      user => {
        this.user = user;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getTokenAndGetUser(code: string){
    this.http.getAccessToken(code).subscribe({
      next: response => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        this.http.getUser();
      },
      error: (err: HttpErrorResponse) => {
        if((<string>err.error.error_description).match('expired')){
          this.router.navigate(['get-started']);
        }
      }
    })
  }

  refresher(){
    let refreshInterval = interval(3000000)
    refreshInterval.subscribe(
       ()=> this.http.getRefreshToken()
    )
  }

  playSong(uris: string[]){
    this.http.playSong(uris);
  }

}
