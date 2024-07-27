import { ChangeDetectionStrategy, Component, inject, input, signal} from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { follow, unfollow } from 'src/app/state/user/user.actions';
import { combineLatest, EMPTY, expand, map, scan, switchMap, tap } from 'rxjs';
import { Artist } from 'src/app/models/artist.model';
import { HttpGeneralService } from 'src/app/services/http/general/http-general.service';
import { IsPlayingDirective } from 'src/app/shared/is-playing.directive';
import { TrackItemComponent } from 'src/app/shared/track-item/track-item.component';
import { AlbumItemComponent } from 'src/app/shared/album-item/album-item.component';
import { RepeatPipe } from 'ngxtension/repeat-pipe';
import { TrackPlaceholderComponent } from 'src/app/shared/track-placeholder.component';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [TrackItemComponent, IsPlayingDirective, MatButtonModule, AlbumItemComponent, RepeatPipe, TrackPlaceholderComponent],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistComponent {
  private http = inject(HttpGeneralService);
  private store = inject(Store);

  limit = signal<number>(5);
  more = signal<boolean>(true);

  artist? = input<Artist>();
  
  // artist = toSignal(
  //   this.activatedRoute.data.pipe(
  //     map(data => data?.artist),
  //     tap(() => this.reset())
  //   )
  // ) as Signal<Artist>

  topTracks = toSignal(
    toObservable(this.artist).pipe(
      switchMap(({id}) => this.http.getTopTracksOfArtist(id)),
      map((response) => response.tracks)
    )
  )
  
  albums = toSignal(
    combineLatest([toObservable(this.artist), toObservable(this.limit)])
    .pipe(
      switchMap(([{id}, limit]) => {
        if(limit == 5)
          return this.getAlbums(id, limit)
        else
          return this.getAllAlbums(id, limit)
      }),
      map(res => res.items),
      scan((prev, curr) => {
        if(this.limit()==5)
          return [...curr]
        else
          return [...prev, ...curr]
      }) 
    )
  )
  
  isFollowing = signal<boolean>(null)

  constructor(){
    toObservable(this.artist)
    .pipe(
      takeUntilDestroyed(),
      switchMap(({id}) => this.http.isFollowing(id, "artist")),
      tap((result) => this.isFollowing.set(result[0]))
    ).subscribe()
  }
  
  follow(){
    this.store.dispatch(follow({id: this.artist().id, typeOf: 'artist'}))
    this.isFollowing.set(true)
  } 
  
  unfollow(){
    this.store.dispatch(unfollow({id: this.artist().id, typeOf: 'artist'}))
    this.isFollowing.set(false)
  }
  
  reset(){
    this.limit.set(5);
    this.more.set(true);
  }
  
  getAlbums(id: string, limit: number){
    return this.http.getAlbumsOfArtist(id, limit)
  }
  
  getAllAlbums(id: string, limit: number){
    return this.http.getAlbumsOfArtist(id, limit, 5)
    .pipe(
      expand(res =>
        (res.next && res.items.length > 0) ? 
        this.http.getAlbumsOfArtist(id, limit, (res.offset + limit)) : 
        EMPTY
      ),
    ) 
  }
}