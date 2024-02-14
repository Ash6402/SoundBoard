import { Directive, Input, inject, OnInit, ElementRef, Renderer2, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Store } from '@ngrx/store';
import { currentPlaying } from '../state/player/player.selector';

@Directive({
  selector: '[isPlaying]',
  standalone: true,
})
export class IsPlayingDirective implements OnInit {

  private el = inject(ElementRef).nativeElement as HTMLElement;
  private renderer = inject(Renderer2);
  private store = inject(Store);
  @Input('isPlaying') trackId: string;
  private currentSong$ = this.store.select(currentPlaying).pipe(takeUntilDestroyed());
  style: string = '#303030';

  ngOnInit(){
    this.currentSong$.subscribe((currTrack)=>{
      if(!currTrack) return;
      this.trackId == currTrack.id ? 
      this.renderer.setStyle(this.el, 'backgroundColor', 'rgba(128,0, 128, 0.5)') :
      this.renderer.setStyle(this.el, 'backgroundColor', '#303030');
    })
  }
}
