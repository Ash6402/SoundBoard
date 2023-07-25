/// <reference types="@types/spotify-web-playback-sdk"/>
import { Injectable, inject } from "@angular/core";
import { from } from "rxjs";
import { HttpPlayerService } from "./http-player.service";
import { Store } from "@ngrx/store";
import { change } from "src/app/state/player/player.actions";

@Injectable({providedIn: 'root'})

export class PlayerSDKSerivce{

  playerHttpService = inject(HttpPlayerService);
  private store = inject(Store);
  player: Spotify.Player;
  device_id: string;
  private http = inject(HttpPlayerService);

  initializePlayer(){
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.player = new Spotify.Player({
        name: 'Web Player SDK - SoundBoard',
        getOAuthToken: cb => {
          cb(localStorage.getItem('access_token'));
        },
        volume: 1,
      })
      this.stateChanged();
      this.addListener();
      this.connect();
    }
  }

  getDevices(){
    this.http.getDevices();
  }

  transferPlayback(){
    this.http.transferPlayback(this.device_id)
    .subscribe(()=>{
      console.log('transferred playback')
    });
  }

  addListener(){
    this.player.addListener('ready', ( {device_id} ) => {
      console.log('The Web Playback SDK is ready to play music!');
      console.log('Device ID', device_id);
      this.device_id = device_id;
      this.transferPlayback();
    })
  }

  getPlayerState(){
    from(this.player.getCurrentState())
    .subscribe({
      next: state => {
        if (!state) {
          console.error('User is not playing music through the Web Playback SDK');
          return;
        }
        console.log(state);
      }
    });
  }

  connect(){
    from(this.player.connect())
    .subscribe({
        next: (response)=>{        
          if(response)
          console.log('connected successfully!');
        }
    })
  }

  stateChanged(){
    this.player.addListener('player_state_changed',
    ({position, duration, paused, track_window})=>{
        this.store.dispatch(change({
          state: {
          progress: position,
          duration,
          paused,
          currentPlaying: track_window.current_track,
          next: track_window.next_tracks[0],
          previous: track_window.previous_tracks[0],
          }
        }));
    });
  }

  togglePlay(){
   return from(this.player.togglePlay());
  }
  
  nextPlay(){
    return from(this.player.nextTrack())
  }
  
  previousPlay(){
    return from(this.player.previousTrack())
  }

  disconnect(){
    this.player?.disconnect();
  }
  
  removeListener(){
    this.player?.addListener('not_ready', ()=>{
      console.log('player removed');
    })
  }

}