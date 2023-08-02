import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Store } from '@ngrx/store';
import { Subject, interval, takeUntil, tap } from 'rxjs';
import { increment, seek } from 'src/app/state/player/player.actions';
import { duration, paused, position } from 'src/app/state/player/player.selector';

@Component({
  selector: 'app-media-progress-bar',
  template: `
    <div class="media-progress">
      <p>{{ ((progress$ | async) | durationConverter) }}</p>
      <mat-slider [min]="0" 
      [max]="duration$ | async" class="progress-bar">
          <input (dragEnd)="seekToPosition(progressBar.value)" 
          [value]="progress$ | async" 
          matSliderThumb #progressBar>
      </mat-slider>
      <p>{{ duration$ | async | durationConverter }}</p>
    </div>`,

  styles: [
    `.media-progress{
      display: flex;
      font-size: 12px;
      align-items: center;
      gap: 1rem;
  
      p{
        margin-bottom: 0;
      }
  
      .progress-bar{
        width: 50vw;
        max-width: 20rem;
      }
    }`
  ],
})

// Another change detection issue in this component. If I toggle it works fine. but after the seek()
// function is called and the continueProgress() refires the timer. change detection stops again. So
// once again manually firing the change detection.

export class MediaProgressBarComponent implements OnInit {
  store = inject(Store);
  progress$ = this.store.select(position);
  duration$ = this.store.select(duration);
  paused$ = this.store.select(paused);
  destroy$ = new Subject<void>();
  cdr = inject(ChangeDetectorRef);

  ngOnInit(){
    this.paused$.pipe(takeUntilDestroyed(),
      tap(isPaused => {
        if(isPaused)
          this.destroy$.next();
        else
          this.continuedProgress();
      })).subscribe();
  }

  seekToPosition(position: number){
    this.store.dispatch(seek({position}));
  }

  continuedProgress(){
    interval(1000).pipe(takeUntilDestroyed(),
      tap(()=>this.store.dispatch(increment())),
      takeUntil(this.destroy$),
    ).subscribe(() => this.cdr.detectChanges());
  }
}
