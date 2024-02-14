import { animate, query, stagger, style, transition, trigger} from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { HttpPlayerService } from 'src/app/services/http/player/http-player.service';
import { LikedSongsStore } from './liked-songs.store';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { Store } from '@ngrx/store';
import { likedSongs } from 'src/app/state/liked-songs/liked-songs.selectors';
import { fetchLikedSongs, removeFromLiked } from 'src/app/state/liked-songs/liked-songs.actions';
import { HttpGeneralService } from 'src/app/services/http/general/http-general.service';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';
import { TrackItemComponent } from '../../shared/track-item/track-item.component';
import { share, tap } from 'rxjs';

@Component({
    selector: 'app-liked-songs',
    templateUrl: './liked-songs.component.html',
    styleUrls: ['./liked-songs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [LikedSongsStore],
    animations: [
        trigger('listAnimation', [
            transition('*<=>*', [
                query(':enter', [
                    style({ opacity: 0 }), stagger('60ms', animate('160ms ease-out', style({ opacity: 1 })))
                ], { optional: true }),
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
    ],
    standalone: true,
    imports: [TrackItemComponent, MatIconButton, MatTooltip, MatIcon, MatProgressSpinner, AsyncPipe]
})
export class LikedSongsComponent implements OnInit {
  
  store = inject(Store);
  savedTracks$ = this.store.select(likedSongs).pipe(tap((tracks => {
    if(tracks.length === 0)
        this.store.dispatch(fetchLikedSongs());
  })));
  httpPlayer = inject(HttpPlayerService);
  httpGeneralService = inject(HttpGeneralService);
  currentPageService = inject(CurrentPageService);

  ngOnInit(): void {
    this.currentPageService.currentPage$.next("Liked Songs");
  }

  remove(id: string){
    this.store.dispatch(removeFromLiked({id}));
  }
}
