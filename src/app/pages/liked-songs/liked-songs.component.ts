import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, EMPTY, expand } from 'rxjs';
import { HttpPlayerService } from 'src/app/services/http/player/http-player.service';
import { addToQueue } from 'src/app/state/queue/queue.actions';

@Component({
  selector: 'app-liked-songs',
  templateUrl: './liked-songs.component.html',
  styleUrls: ['./liked-songs.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('*<=>*', [
        query(':enter', [
          style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))
        ],{optional: true})
      ])
    ])
  ]
})
export class LikedSongsComponent implements OnInit {
  
  savedTracks = new BehaviorSubject<any>([]);
  httpPlayer = inject(HttpPlayerService);
  private store = inject(Store);

  ngOnInit(): void {
    this.getSavedTracks();
  }

  getSavedTracks(){
    this.httpPlayer.getSavedTracks().pipe(
      expand((res)=>{
        this.savedTracks.next([...this.savedTracks.value ,...res.items])
        return res.next ? this.httpPlayer.getSavedTracks(res.next) : EMPTY
      })
    ).subscribe();
  }

  addToQueue(uri: string){
    this.store.dispatch(addToQueue({uri}));
  }

  playSong(uris: string[]){
    this.httpPlayer.playSong(uris);
  }
}
