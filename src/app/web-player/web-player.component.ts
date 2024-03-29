import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PlayerSDKSerivce } from '../services/http/player/player-sdk.service';
import { HttpPlayerService } from '../services/http/player/http-player.service';
import { Store } from '@ngrx/store';
import { currentPlaying } from '../state/player/player.selector';
import { getQueue } from '../state/queue/queue.actions';
import { selectQueue } from '../state/queue/queue.selector';
import { tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MediaProgressBarComponent } from './media-progress-bar/media-progress-bar.component';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { MatMiniFabButton } from '@angular/material/button';
import { PlayerButtonsComponent } from './player-buttons/player-buttons.component';
import { MatToolbar } from '@angular/material/toolbar';
import { TrackDetailsComponent } from './track-details/track-details.component';

@Component({
    selector: 'app-web-player',
    templateUrl: './web-player.component.html',
    styleUrls: ['./web-player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatToolbar,
        PlayerButtonsComponent,
        TrackDetailsComponent,
        MatMiniFabButton,
        MatTooltip,
        MatMenuTrigger,
        MatIcon,
        MediaProgressBarComponent,
        MatMenu,
        MatMenuItem,
        MatProgressSpinner,
        AsyncPipe,
    ],
})

// I am using the manual change detection because due to some reason the component doesn't
// check for changes even if the streams emit a new value and using the async pipe. I am using
// the manual change detection as a last resort because I cannot seem to debug this issue.

export class WebPlayerComponent implements OnInit, OnDestroy{
  playerSDKService = inject(PlayerSDKSerivce);
  playerHttpService = inject(HttpPlayerService);
  cdr = inject(ChangeDetectorRef)
  store = inject(Store);
  currentTrack$ = this.store.select(currentPlaying)
  .pipe(tap(()=>{this.cdr.detectChanges()}));
  queue$ = this.store.select(selectQueue);

  ngOnInit(): void {
    this.loadScript();
  }

  loadScript(){
    let node = document.createElement('script');
    node.async = true;
    node.src = 'https://sdk.scdn.co/spotify-player.js';
    node.type = 'text/javascript';
    document.querySelector('.player-card').insertAdjacentElement('afterbegin', node);
  }

  getQueue(){
    this.store.dispatch(getQueue());
  }

  ngOnDestroy(): void {
    this.playerSDKService.disconnect();
    this.playerSDKService.removeListener();
  }
}
