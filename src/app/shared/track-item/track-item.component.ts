import { Component, inject, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Track } from '../../models/track.model';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { addToQueue } from 'src/app/state/queue/queue.actions';
import { play } from 'src/app/state/player/player.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { IsPlayingDirective } from '../is-playing.directive';
import { TrimmerPipe } from 'src/app/pipes/trimmer.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-track-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    IsPlayingDirective,
    TrimmerPipe,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
        <mat-card [isPlaying]="track().id" 
        mat-raised-button
        class="track-item">
        <div class="info-container"
            (click)="playSong([track().uri])">
            <p>{{index()+1}}</p>
            <img [src]="track().album?.images[0].url || track().images[0].url"
              height="50px"
              width="50px" loading="lazy"/>
              <div>
                <h3 class="track-name">{{track().name | trimmer | async }}</h3>
                <ul class=artists>
                  @for(artist of track().artists; track artist.id){
                    <li>
                      <a class="link" [routerLink]="['/artist', artist.id]"
                     (click)="$event.stopPropagation()">{{ artist.name }}</a>
                    </li>
                  }
                </ul>
              </div>
            </div>
            @if (!(isMobile | async)) {
              <div class="action-btns">
                <ng-content></ng-content>
                <button mat-icon-button matTooltip="Add to queue"
                  matTooltipPosition="above"
                  matTooltipShowDelay="300"
                  (click)="addToQueue(track().uri)"><mat-icon>queue</mat-icon>
                </button>
              </div>
              }
        </mat-card>
        `,
  styleUrls: ['./track-item.component.scss'],
  })
export class TrackItemComponent {

  index = input.required<number>();
  track = input.required<Track | any>();

  isMobile = inject(BreakpointObserver)
    .observe('(max-width: 599px)')
    .pipe(map((res: BreakpointState) => res.matches));
  private store = inject(Store);

  addToQueue(uri: string){
    this.store.dispatch(addToQueue({uri}));
  }

  playSong(uris: string[]){
    this.store.dispatch(play({uris}));
  }
}
