import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgZone, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-track-details',
  standalone: true,
  imports: [AsyncPipe, RouterLink ],
  template: `
    @if(track$ | async; as track){
      <div class="song-details">
        <img class="current-track-img"
          [src]="track.album.images[0].url" />
        <a class="song-name link" (click)="navigate(track.id)"> {{ track.name }} </a>
        <ul class="artists">
          @for(artist of track.artists; track artist.name){
            <li><a class="link">{{ artist.name }}</a></li>
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

/*  
  The navigation event is running outside angular, programmatically or even using the routerLink property
  so i have to manually run it inside ngZone. I have no idea why is this outside ngZone. :(( 
*/  

export class TrackDetailsComponent {
  @Input({required: true, alias: 'track'}) track$: Observable<Spotify.Track>
  private router = inject(Router);
  private ngZone = inject(NgZone);

  navigate(id: string){
    this.ngZone.run(() =>
      this.router.navigate(['track'], {
        queryParams: {
          id
        }
      })
    )
  }
}
