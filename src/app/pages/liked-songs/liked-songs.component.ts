import { animate, query, stagger, style, transition, trigger} from '@angular/animations';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { HttpPlayerService } from 'src/app/services/http/player/http-player.service';
import { LikedSongsStore } from './liked-songs.store';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { Store } from '@ngrx/store';
import { likedSongs } from 'src/app/state/liked-songs/liked-songs.selectors';
import { fetchLikedSongs, removeFromLiked } from 'src/app/state/liked-songs/liked-songs.actions';
import { HttpGeneralService } from 'src/app/services/http/general/http-general.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
        animate('1000ms ease-out'),
      ]),
    ]),
    trigger('remove', [
        transition(':leave', [
        animate('200ms ease-in', style({
          transform: 'translateX(100%)',
          opacity: 0,
        })),
        animate('60ms ease-out', style({
          height: 0,
        }))
     ]),
    ]), 
    
  ]
})
export class LikedSongsComponent implements OnInit {
  
  store = inject(Store);
  savedTracks$ = this.store.select(likedSongs);
  httpPlayer = inject(HttpPlayerService);
  httpGeneralService = inject(HttpGeneralService);
  currentPageService = inject(CurrentPageService);
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.savedTracks$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      if(res.length === 0) this.store.dispatch(fetchLikedSongs());
    })
    this.currentPageService.currentPage$.next("Liked Songs");
  }

  remove(id: string){
    this.store.dispatch(removeFromLiked({id}));
  }
}
