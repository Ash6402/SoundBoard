import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlaybackState } from 'src/app/models/playback-state.model';
import { Queue } from 'src/app/models/queue.model';
import { SavedTracks } from 'src/app/models/saved-tracks.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HttpPlayerService {
  private http = inject(HttpClient);
  queue$ = new BehaviorSubject<Queue>(null);
  
  limit = 0;

  getPlayerState(){
    return this.http.get<PlaybackState>(`${environment.apiUrl}/player`);
  }

  getDevices(){
    this.http.get(`${environment.apiUrl}/player/devices`).subscribe(
      (response)=>{
        console.log(response);
      }
    )
  }

  getAlbums(){
    this.http.get(`${environment.apiUrl}/albums`)
    .subscribe(
      response => {
        console.log(response);
      }
    )
  }

  getSavedTracks(){
    return this.http.get<SavedTracks>(`${environment.apiUrl}/tracks`, 
    {
      params: new HttpParams().set('limit', 50)
    });
  }

  getQueue(){
   this.http.get<Queue>
    (`${environment.apiUrl}/player/queue`).subscribe((response)=>{
        console.log(response)
        this.queue$.next(response);
      })
  }

  addToQueue(uri: string){
    this.http.post(`${environment.apiUrl}/player/queue`,{}, {
      params: new HttpParams().set('uri', uri)
    }).subscribe();
  }

  transferPlayback(deviceId: string){
    return this.http.put(`${environment.apiUrl}/player`, {
      device_ids: [deviceId],
    })
  }

  playSong(uri: string[]){
    this.http.put(`${environment.apiUrl}/player/play`, {
      uris: uri,
      offset: {position:0},
      position_ms: 0,
    },).subscribe();
  }

  seekToPosition(position: number){
    return this.http.put(`${environment.apiUrl}/player/seek`, {}, {
      params: new HttpParams().set('position_ms', position)
    })
  }
}
