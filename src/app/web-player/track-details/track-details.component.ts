import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { LinkComponent } from 'src/app/shared/link/link.component';

@Component({
  selector: 'app-track-details',
  standalone: true,
  imports: [AsyncPipe, RouterLink, LinkComponent],
  template: `
    @if(track$ | async; as track){
      <div class="song-details">
        <img class="current-track-img"
          [src]="track.album.images[0].url" />
        <a class="song-name link" [routerLink]="['/track', track.id]"> {{ track.name }} </a>
        <ul class="artists">
          @for(artist of track.artists; track artist.id){
            <li><app-link [artist]='artist' /></li>
          }
        </ul>
      </div>
    }@else{
      <div class="placeholder">
        <img src="/assets/placeholder.png" class="current-track-img"/>
      </div>
    }
  `,
  styleUrl: './track-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TrackDetailsComponent {
  @Input({required: true, alias: 'track'}) track$: Observable<Spotify.Track>
}