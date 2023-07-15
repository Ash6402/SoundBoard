import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PlayerSDKSerivce } from '../services/http/auth/player/player-sdk.service';
import { HttpPlayerService } from '../services/http/auth/player/http-player.service';

@Component({
  selector: 'app-web-player',
  templateUrl: './web-player.component.html',
  styleUrls: ['./web-player.component.scss'],
})

export class WebPlayerComponent implements OnInit, OnDestroy {
  playerSDKService = inject(PlayerSDKSerivce);
  playerHttpService = inject(HttpPlayerService);
  currentTrack$ = this.playerSDKService.currentTrack$;
  queue$ = this.playerHttpService.queue$;

  ngOnInit(): void {
    this.loadScript();
  }

  loadScript(){
    let node =document.createElement('script');
    node.async = true;
    node.src = 'https://sdk.scdn.co/spotify-player.js';
    node.type = 'text/javascript';
    document.querySelector('.player-card').insertAdjacentElement('afterbegin', node);
  }

  getQueue(){
    this.playerHttpService.getQueue();
  }

  ngOnDestroy(): void {
    this.playerSDKService.disconnect();
    this.playerSDKService.removeListener();
  }
}
