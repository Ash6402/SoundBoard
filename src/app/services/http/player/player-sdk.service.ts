/// <reference types="@types/spotify-web-playback-sdk"/>
import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, Subject, from } from "rxjs";
import { HttpPlayerService } from "./http-player.service";
import { Store } from "@ngrx/store";
import { change } from "src/app/state/player/player.actions";
import { PlayerState } from "src/app/state/player/player.reducers";
import { Track } from "src/app/models/track.model";

@Injectable({providedIn: 'root'})

export class PlayerSDKSerivce{

  playerHttpService = inject(HttpPlayerService);

  token = localStorage.getItem('access_token');
  private store = inject(Store);
  player: Spotify.Player;
  device_id: string;
  // currentTrack$ = new BehaviorSubject<Spotify.Track>(null);
  // progress$ = new BehaviorSubject<number>(0);
  // duration$ = new BehaviorSubject<number>(0);
  // playerLoaded$ = new BehaviorSubject<boolean>(false);
  // paused$ = new BehaviorSubject<boolean>(true);
  private http = inject(HttpPlayerService);

  initializePlayer(){
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.player = new Spotify.Player({
        name: 'Web Player SDK - SoundBoard',
        getOAuthToken: cb => {
            cb(this.token);
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
        // this.currentTrack$.next(state.track_window.current_track);
        // this.duration$.next(state.track_window.current_track.duration_ms)
        // this.progress$.next(state.position);
        // this.paused$.next(state.paused);
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
    //  ({
    //   position,
    //   duration,
    //   paused,
    //   track_window: { current_track }
    // }) => {
    //   this.playerLoaded$.next(true);
    //   console.log('Currently Playing', current_track);
    //   console.log('paused', paused);
    //   // console.log('Position in Song', position);
    //   // console.log('Duration of Song', duration);
    //   this.currentTrack$.next(current_track);
    //   this.duration$.next(duration);
    //   this.progress$.next(position);
    //   this.paused$.next(paused);
    // }
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
  from(this.player.nextTrack())
  .subscribe({
    next: ()=>{
      console.log('Next track Player');
    }
  })
  }
  
  previousPlay(){
    from(this.player.previousTrack())
    .subscribe({
        next: ()=>{
            console.log('previous track Player');
        }
    })
  }

  disconnect(){
    this.player?.disconnect();
  }
  
  removeListener(){
    this.player?.addListener('not_ready', ()=>{
      console.log('player removed');
    })
  }
  
  seekToPosition(position: number){
    this.player.seek(position);
  }

}