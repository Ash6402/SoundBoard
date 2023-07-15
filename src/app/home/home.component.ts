import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpAuthService } from '../services/http/auth/http-auth.service';
import { UserService } from '../services/user.service';
import { Subject, interval, map, repeat, takeUntil} from 'rxjs';
import { HttpPlayerService } from '../services/http/auth/player/http-player.service';
import { Track } from '../models/track.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private httpAuth = inject(HttpAuthService);
  private httpPlayer = inject(HttpPlayerService);
  private userService = inject(UserService);
  user$ = this.userService.currentUser$;
  expiry: Date;
  current: Date;
  savedTracks: {added_at: string, track: Track}[] = [];

  ngOnInit(): void {
    const code = this.route.snapshot.queryParams['code'];
    if(localStorage.getItem('expiry'))
      this.expiry = new Date(Number(localStorage.getItem('expiry')));
    this.current = new Date();
    if(this.expiry && this.current < this.expiry){
      this.httpAuth.getRefreshToken();
      this.userService.getUser();
      this.getSavedTracks();
    }else{
      this.getTokenAndGetUser(code);
    }
    this.refresher();
  }

  getTokenAndGetUser(code: string){
    return this.httpAuth.getAccessToken(code)
    .subscribe({
      next: response => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('expiry', new Date().setSeconds(new Date().getSeconds() + response.expires_in).toString())
        this.userService.getUser();
        this.getSavedTracks();
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
    refreshInterval.subscribe(()=> this.httpAuth.getRefreshToken())
  }

  playSong(uris: string[]){
    this.httpPlayer.playSong(uris);
  }

  getSavedTracks(){
    let total = 0;
    let count = 0;
    let break$ = new Subject<null>() 
    return this.httpPlayer.getSavedTracks().pipe(
      map((response)=>{
        total = response.total;
        if(count === total){
          break$.next(null);
        }
        count += response.items.length;
        return response;
      }),
      repeat({delay: 1000}),
      takeUntil(break$),
    )
    .subscribe({
      next:  response => {
        this.savedTracks = [...this.savedTracks, ...response.items];
        console.log(response);
      },
    })
  }

  addToQueue(uri: string){
    this.httpPlayer.addToQueue(uri);
  }

}
