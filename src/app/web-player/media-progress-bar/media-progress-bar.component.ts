import { Component, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, interval, map, of, switchMap } from 'rxjs';
import { PlayerSDKSerivce } from 'src/app/services/http/auth/player/player-sdk.service';

@Component({
  selector: 'app-media-progress-bar',
  template: `
    <div class="media-progress">
      <p>{{ ((progress$ | async) | durationConverter) }}</p>
      <mat-slider [disableRipple]="true" [min]="0" 
      [max]="duration$ | async" class="progress-bar">
          <input (dragEnd)="seekToPosition(progressBar.value)" 
          [value]="progress$ | async" 
          matSliderThumb #progressBar>
      </mat-slider>
      <p>{{ duration$ | async | durationConverter }}</p>
    </div>`,

  styles: [
    `.media-progress{
      display: flex;
      align-items: center;
      gap: 1rem;
  
      p{
        margin-bottom: 0;
      }
  
      .progress-bar{
        width: 50vw;
        max-width: 20rem;
      }
    }`
  ],
})

export class MediaProgressBarComponent implements OnInit {
  playerSDKService = inject(PlayerSDKSerivce);
  progress$: BehaviorSubject<number> | Observable<number>;
  duration$ = this.playerSDKService.duration$;
  paused$ = this.playerSDKService.paused$;
  subscription: Subscription;

  ngOnInit(){
    this.progress$ = this.playerSDKService.progress$.pipe(
      switchMap((value)=>{
        if(this.paused$.value){
          return of(value);
        }
        return interval(1000).pipe(
          map((int) => {
            let val = (value + (int * 1000))
            console.log(val)
            return val;
          }
        ))
      })
    )
  }

  seekToPosition(position: number){
    this.playerSDKService.seekToPosition(position);
  }
}
