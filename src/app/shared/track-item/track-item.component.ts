import { Component, Input, inject, ChangeDetectionStrategy } from '@angular/core';
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
        <mat-card [isPlaying]="track"
        mat-raised-button
        class="track-item">
        <div class="info-container"
        (click)="playSong([track.uri])">
            <p>{{index+1}}</p>
            <img [src]="track.album?.images[0].url || track.images[0].url"
                height="50px"
                width="50px" loading="lazy"/>
                <h3 class="track-name">{{track.name}}</h3>
        </div>
        <div class="action-btns" *ngIf="!(isMobile | async) else mobile">
            <ng-content></ng-content>
            <button mat-icon-button matTooltip="Add to queue"
             matTooltipPosition="above"
             matTooltipShowDelay="300"
             (click)="addToQueue(track.uri)"><mat-icon>queue</mat-icon></button>
        </div>
    </mat-card>
    <ng-template #mobile>

    </ng-template>
  `,
  styleUrls: ['./track-item.component.scss'],
})
export class TrackItemComponent {
  @Input() index: number;
  @Input() track: Track | any;

  isMobile = inject(BreakpointObserver)
    .observe('(max-width: 599px)')
    .pipe(map((res: BreakpointState) => res.matches));
  private store = inject(Store);

  addToQueue(uri: string){
    this.store.dispatch(addToQueue({uri}));
  }

  playSong(uris: string[]){
    this.store.dispatch(play({uris: uris}));
  }
}
