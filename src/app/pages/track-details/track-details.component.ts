import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DurationConverterPipe } from 'src/app/pipes/duration-converter.pipe';
import { HttpGeneralService } from 'src/app/services/http/general/http-general.service';
import { LinkComponent } from 'src/app/shared/link/link.component';
import { play } from 'src/app/state/player/player.actions';
import { currentPlaying, paused, ready } from 'src/app/state/player/player.selector';

@Component({
  selector: 'app-track-details-page',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatIconModule, 
    DurationConverterPipe, 
    AsyncPipe,
    LinkComponent
  ],
  templateUrl: './track-details.component.html',
  styleUrl: './track-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackDetailsPageComponent  {

    constructor(){
      effect(() => {
        console.log(this.track())
      })
    }
  
  private activatedRoute = inject(ActivatedRoute);
  private httpService = inject(HttpGeneralService);
  private store = inject(Store);

  track = toSignal(this.httpService.getTrack(this.activatedRoute.snapshot.params.id))
  currentSong = toSignal(this.store.select(currentPlaying))
  paused = toSignal(this.store.select(paused))
  isReady = toSignal(this.store.select(ready))

  play(uris: string[]){
    this.store.dispatch(play({uris}))
  }

  getDuration(miliseconds: number){
    const seconds = miliseconds / 1000;
    const getMinutes = Math.floor(seconds / 60);
    const getSeconds = Math.floor(seconds % 60);

    return `${getMinutes} minutes ${getSeconds} seconds`
  }
  
}
