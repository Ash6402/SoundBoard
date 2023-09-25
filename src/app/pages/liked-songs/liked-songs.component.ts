import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HttpPlayerService } from 'src/app/services/http/player/http-player.service';
import { LikedSongsStore } from './liked-songs.store';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { Store } from '@ngrx/store';
import { likedSongs } from 'src/app/state/liked-songs/liked-songs.selectors';
import { clearState, fetchLikedSongs, removeFromLiked } from 'src/app/state/liked-songs/liked-songs.actions';
import { tap } from 'rxjs';
import { HttpGeneralService } from 'src/app/services/http/general/http-general.service';

@Component({
  selector: 'app-liked-songs',
  templateUrl: './liked-songs.component.html',
  styleUrls: ['./liked-songs.component.scss'],
  providers: [LikedSongsStore],
  animations: [
    trigger('listAnimation', [
      transition('*<=>*', [
        query(':enter', [
          style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))
        ],{optional: true}),
      ]),
    ]),
  ]
})
export class LikedSongsComponent implements OnInit, OnDestroy {
  
  store = inject(Store);
  savedTracks$ = this.store.select(likedSongs).pipe(tap((res) => console.log(res)));
  httpPlayer = inject(HttpPlayerService);
  httpGeneralService = inject(HttpGeneralService);
  currentPageService = inject(CurrentPageService);

  ngOnInit(): void {
    this.store.dispatch(fetchLikedSongs());
    this.currentPageService.currentPage$.next("Liked Songs");
  }

  remove(id: string){
    this.store.dispatch(removeFromLiked({id})); 
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearState());
  }

}
