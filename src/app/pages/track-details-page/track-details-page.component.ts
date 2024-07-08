import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Track } from 'src/app/models/track.model';
import { DurationConverterPipe } from 'src/app/pipes/duration-converter.pipe';
import { HttpGeneralService } from 'src/app/services/http/general/http-general.service';
import { play } from 'src/app/state/player/player.actions';
import { currentPlaying, paused, ready } from 'src/app/state/player/player.selector';

@Component({
  selector: 'app-track-details-page',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, DurationConverterPipe, AsyncPipe],
  templateUrl: './track-details-page.component.html',
  styleUrl: './track-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackDetailsPageComponent implements OnInit {
  track = signal<Track>(null);

  store = inject(Store);

  currentSong$ = this.store.select(currentPlaying);
  paused$ = this.store.select(paused);
  isReady$ = this.store.select(ready);

  play(uris: string[]){
    this.store.dispatch(play({uris}))
  }

  getDuration(miliseconds: number){
    const seconds = miliseconds / 1000;
    const getMinutes = Math.floor(seconds / 60);
    const getSeconds = Math.floor(seconds % 60);

    return `${getMinutes} minutes ${getSeconds} seconds`
  }
  
  activatedRoute = inject(ActivatedRoute);
  httpService = inject(HttpGeneralService);

  $destroyRef = inject(DestroyRef);
  
  ngOnInit(): void {
    this.httpService.getTrack(this.activatedRoute.snapshot.params.id)
    .pipe(takeUntilDestroyed(this.$destroyRef))
    .subscribe((track) => {
      console.log(track)
      this.track.set(track)
  })
  }
}
