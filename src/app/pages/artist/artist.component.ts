import { ChangeDetectionStrategy, Component, Signal,inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
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
  artist  = toSignal(this.activatedRoute.data.pipe(map(data => data?.artist)), {initialValue: null}) as Signal<Artist>
  topTracks = toSignal(
    toObservable(this.artist).pipe(
      switchMap((artist) => this.http.getTopTracksOfArtist(artist.id)),
      map((response) => response.tracks)
    )
  )
}
