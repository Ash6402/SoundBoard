import { Component, inject } from '@angular/core';
import { PlayerSDKSerivce } from 'src/app/services/http/auth/player/player-sdk.service';

@Component({
  selector: 'app-player-buttons',

  template: `
    <div class="btns">
      <button mat-mini-fab matTooltip="Play previous track" class="icon-btn"
      matTooltipPosition="above" [disabled]="!(isReady$ | async)"
      matTooltipShowDelay="300"
      color="primary" (click)="previousPlay()"><mat-icon>skip_previous</mat-icon></button>
      <button mat-mini-fab matTooltip="Play/pause" [disabled]="!(isReady$ | async)"
      matTooltipPosition="above"
      matTooltipShowDelay="300"
      color="primary" (click)="togglePlay()"><mat-icon>play_arrow</mat-icon></button>
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
})
export class PlayerButtonsComponent {
  playerSDKService = inject(PlayerSDKSerivce);
  isReady$ = this.playerSDKService.playerLoaded$;

  previousPlay(){
    this.playerSDKService.previousPlay();
  }

  togglePlay(){
    this.playerSDKService.togglePlay();
  }

  nextPlay(){
    this.playerSDKService.nextPlay();
  }

}