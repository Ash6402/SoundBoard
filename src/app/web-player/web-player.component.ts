import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PlayerSDKSerivce } from '../services/http/player/player-sdk.service';
import { HttpPlayerService } from '../services/http/player/http-player.service';
import { Store } from '@ngrx/store';
import { currentPlaying } from '../state/player/player.selector';
import { tap } from 'rxjs';
import { getQueue } from '../state/queue/queue.actions';
import { selectQueue } from '../state/queue/queue.selector';

@Component({
  selector: 'app-web-player',
  templateUrl: './web-player.component.html',
  styleUrls: ['./web-player.component.scss'],
})

export class WebPlayerComponent implements OnInit, OnDestroy {
  playerSDKService = inject(PlayerSDKSerivce);
  playerHttpService = inject(HttpPlayerService);
  store = inject(Store);
  currentTrack$ = this.store.select(currentPlaying);
  queue$ = this.store.select(selectQueue);

  ngOnInit(): void {
    this.loadScript();
    this.playerSDKService.initializePlayer();
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
