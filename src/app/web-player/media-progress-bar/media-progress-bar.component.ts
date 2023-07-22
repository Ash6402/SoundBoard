import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PlayerSDKSerivce } from 'src/app/services/http/player/player-sdk.service';
import { seek } from 'src/app/state/player/player.actions';
import { duration, paused, position } from 'src/app/state/player/player.selector';

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
  store = inject(Store);
  progress$ = this.store.select(position);
  duration$ = this.store.select(duration);
  paused$ = this.store.select(paused);
  subscription: Subscription;

  ngOnInit(){

  }

  seekToPosition(position: number){
    this.store.dispatch(seek({position}));
  }
}
