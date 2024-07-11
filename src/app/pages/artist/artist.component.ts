import { ChangeDetectionStrategy, Component, Signal, inject, signal} from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { follow, unfollow } from 'src/app/state/user/user.actions';
import { map, switchMap, tap } from 'rxjs';
import { Artist } from 'src/app/models/artist.model';
import { HttpGeneralService } from 'src/app/services/http/general/http-general.service';
import { IsPlayingDirective } from 'src/app/shared/is-playing.directive';
import { TrackItemComponent } from 'src/app/shared/track-item/track-item.component';
@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [TrackItemComponent, IsPlayingDirective, MatButtonModule],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistComponent {
  private activatedRoute = inject(ActivatedRoute);
  private http = inject(HttpGeneralService);
  store = inject(Store);

  artist  = toSignal(this.activatedRoute.data.pipe(map(data => data?.artist)), {initialValue: null}) as Signal<Artist>;
  isFollowing = signal<boolean>(null);
  albums = toSignal(
    toObservable(this.artist).pipe(
      
    )
  )

  constructor(){
    toObservable(this.artist)
    .pipe(
      takeUntilDestroyed(),
      switchMap((artist) => this.http.isFollowing(artist.id, "artist")),
      tap((result) => this.isFollowing.set(result[0]))
    ).subscribe()
  }
  
  topTracks = toSignal(
    toObservable(this.artist).pipe(
      switchMap((artist) => this.http.getTopTracksOfArtist(artist.id)),
      map((response) => response.tracks)
    )
  )

  follow(){
    this.store.dispatch(follow({id: this.artist().id, typeOf: 'artist'}))
    this.isFollowing.set(true)
  } 

  unfollow(){
    this.store.dispatch(unfollow({id: this.artist().id, typeOf: 'artist'}))
    this.isFollowing.set(false)
  }
}
