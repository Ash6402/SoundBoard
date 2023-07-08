/// <reference types="@types/spotify-web-playback-sdk"/>

import { Component, OnInit, inject } from '@angular/core';
import { HttpService } from '../services/http.service';
import { interval } from 'rxjs';



@Component({
  selector: 'app-web-player',
  templateUrl: './web-player.component.html',
  styleUrls: ['./web-player.component.scss']
})
export class WebPlayerComponent implements OnInit {
  player: Spotify.Player;
  token = localStorage.getItem('access_token');
  device_id: string;
  currentTrack: Spotify.Track;
  private http = inject(HttpService);

  ngOnInit(): void {
    this.loadScript();

    window.onSpotifyWebPlaybackSDKReady = () => {
      this.player = new Spotify.Player({
        name: 'Web Player SDK - SoundBoard',
        getOAuthToken: cb => {
            cb(this.token);
        },
        volume: 1,
      })
      this.addListener();
      this.connect();
    }
  }

  getDevices(){
    this.http.getDevices();
  }

  transferPlayback(){
    this.http.transferPlayback(this.device_id);
  }

  loadScript(){
    let node =document.createElement('script');
    node.async = true;
    node.src = 'https://sdk.scdn.co/spotify-player.js';
    node.type = 'text/javascript';
    document.querySelector('.player-card').insertAdjacentElement('afterbegin', node);
  }

  connect(){
    this.player.connect().then(
      (response)=>{
        if(response)
          console.log('connected successfully!');
      }
    )
  }

  resume(){
    this.player.resume().then(() => {
      console.log('Resumed!');
      this.getPlayerState();
    });
  }

  disconnect(){
    this.player.disconnect();
  }

  getPlayerState(){
      this.player.getCurrentState().then(state => {
        if (!state) {
          console.error('User is not playing music through the Web Playback SDK');
          return;
        }
  
        console.log(state);
        this.currentTrack = state.track_window.current_track;
      });
  }

  addListener(){
    this.player.addListener('ready', ( {device_id} ) => {
      console.log('The Web Playback SDK is ready to play music!');
      console.log('Device ID', device_id);
      this.device_id = device_id;
      this.transferPlayback();
      this.getPlayerState();
    })
  }

  removeListener(){
    this.player.addListener('not_ready', ()=>{
      console.log('player removed');
    })
  }

  togglePlay(){
    this.player.togglePlay().then(() => {
      console.log('Toggled playback!');
      this.getPlayerState();
    });
  }

  nextPlay(){
    this.player.nextTrack().then(()=>{
      console.log('Next track Player');
    })
  }
  previousPlay(){
    this.player.previousTrack().then(()=>{
      console.log('previous track Player');
    })
  }
}
