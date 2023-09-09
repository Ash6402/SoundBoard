import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlaybackState } from 'src/app/models/playback-state.model';
import { Queue } from 'src/app/models/queue.model';
import { Tracks } from 'src/app/models/tracks.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HttpPlayerService {
  private http = inject(HttpClient);
  queue$ = new BehaviorSubject<Queue>(null);

  getPlayerState(){
    return this.http.get<PlaybackState>(`${environment.apiUrl}/player`);
  }

  getDevices(){
    this.http.get(`${environment.apiUrl}/player/devices`);
  }

  getAlbums(){
    this.http.get(`${environment.apiUrl}/albums`);
  }

  getSavedTracks(url: string = `${environment.apiUrl}/tracks`){ 
    return this.http.get<Tracks>(url,
    {
      params: new HttpParams().set('limit', 50),
    });
  }

  getQueue(){
   return this.http.get<Queue>(`${environment.apiUrl}/player/queue`);
  }

  addToQueue(uri: string){
    return this.http.post(`${environment.apiUrl}/player/queue`,{}, {
      params: new HttpParams().set('uri', uri)
    });
  }

  removeFromLiked(id: string){
    console.log('called');
    return this.http.delete(`${environment.apiUrl}/tracks`, {
      params: new HttpParams().set('ids', id),
    });    
  }

  transferPlayback(deviceId: string){
    return this.http.put(`${environment.apiUrl}/player`, {
      device_ids: [deviceId],
    })
  }

  playSong(uri: string[]){
    return this.http.put(`${environment.apiUrl}/player/play`, {
      uris: uri,
      offset: {position:0},
      position_ms: 0,
    });
  }

  seekToPosition(position: number){
    return this.http.put(`${environment.apiUrl}/player/seek`, {}, {
      params: new HttpParams().set('position_ms', position)
    })
  }
}
