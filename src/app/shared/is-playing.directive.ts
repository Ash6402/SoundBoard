import { Directive, Input, inject, OnInit, ElementRef, Renderer2, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Track } from '../models/track.model';
import { Store } from '@ngrx/store';
import { currentPlaying } from '../state/player/player.selector';
import { take } from 'rxjs';

@Directive({
  selector: '[isPlaying]',
  standalone: true
})
export class IsPlayingDirective implements OnInit {

  private el = inject(ElementRef).nativeElement as HTMLElement;
  private renderer = inject(Renderer2);
  private store = inject(Store);
  @Input('isPlaying') track: Track;
  private currentSong$ = this.store.select(currentPlaying).pipe(takeUntilDestroyed());
  destroyRef = inject(DestroyRef);

  ngOnInit(){
    this.currentSong$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((currTrack)=>{
      if(!currTrack) return;
      this.track.id == currTrack.id ? 
      this.renderer.setStyle(this.el, 'backgroundColor', 'rgba(128,0, 128, 0.5)') :
      this.renderer.setStyle(this.el, 'backgroundColor', '#303030');
    })
  }
}
