import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlayerSDKSerivce } from 'src/app/services/http/player/player-sdk.service';
import { next, previous, toggle } from 'src/app/state/player/player.actions';
import { paused, ready } from 'src/app/state/player/player.selector';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
    selector: 'app-player-buttons',
    template: `
    <div class="btns">
      <button mat-mini-fab matTooltip="Play previous track" class="icon-btn"
        matTooltipPosition="above" [disabled]="!(isReady$ | async)"
        matTooltipShowDelay="300"
        color="primary" (click)="previousPlay()"><mat-icon>skip_previous</mat-icon></button>
        <button mat-mini-fab [matTooltip]="(paused$ | async) ? 'play' : 'pause'" [disabled]="!(isReady$ | async)"
          matTooltipPosition="above"
          matTooltipShowDelay="300"
          color="primary" (click)="togglePlay()">
          @if ((paused$ | async)) {
            <mat-icon>play_arrow</mat-icon>
          } @else {
            <mat-icon>pause_arrow</mat-icon>
          }
        </button>
        <button mat-mini-fab matTooltip="Play next track"
          matTooltipPosition="above" [disabled]="!(isReady$ | async)"
          matTooltipShowDelay="300"
          color="primary" (click)="nextPlay()"><mat-icon>skip_next</mat-icon></button>
        </div>`,
    styles: [
        `.btns{
      display: flex;
      gap: 1rem;
    }`
    ],
    standalone: true,
    imports: [
        MatMiniFabButton,
        MatTooltip,
        MatIcon,
        AsyncPipe,
    ],
})
export class PlayerButtonsComponent {
  playerSDKService = inject(PlayerSDKSerivce);
  store = inject(Store);
  isReady$ = this.store.select(ready);
  paused$ = this.store.select(paused);

  previousPlay(){
    this.store.dispatch(previous());
  }

  togglePlay(){
    this.store.dispatch(toggle());
  }

  nextPlay(){
    this.store.dispatch(next());
  }

}
