import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, map, repeat, takeUntil } from 'rxjs';
import { Track } from 'src/app/models/track.model';
import { HttpPlayerService } from 'src/app/services/http/player/http-player.service';
import { addToQueue } from 'src/app/state/queue/queue.actions';

@Component({
  selector: 'app-liked-songs',
  templateUrl: './liked-songs.component.html',
  styleUrls: ['./liked-songs.component.scss']
})
export class LikedSongsComponent implements OnInit {
  
  savedTracks: {added_at: string, track: Track}[] = [];
  httpPlayer = inject(HttpPlayerService);
  private store = inject(Store);

  ngOnInit(): void {
    this.getSavedTracks();
  }

  getSavedTracks(){
    let total = 0;
    let count = 0;
    let break$ = new Subject<void>();
    return this.httpPlayer.getSavedTracks().pipe(
      map((response)=>{
        total = response.total;
        if(count === total){
          break$.next();
        }
        count += response.items.length;
        return response;
      }),
      repeat({delay: 1000}),
      takeUntil(break$),
    )
    .subscribe({
      next:  response => {
        this.savedTracks = [...this.savedTracks, ...response.items];
      },
    })
  }

  addToQueue(uri: string){
    this.store.dispatch(addToQueue({uri}));
  }

  playSong(uris: string[]){
    this.httpPlayer.playSong(uris);
  }
}
