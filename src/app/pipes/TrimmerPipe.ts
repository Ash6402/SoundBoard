import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { DestroyRef, Pipe, PipeTransform, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Pipe({
  name: 'trimmer',
  standalone: true
})
export class TrimmerPipe implements PipeTransform {
  bo = inject(BreakpointObserver);
  destroyRef = inject(DestroyRef);
  val = new BehaviorSubject<string>(null);
  transform(value: string, ...args: unknown[]): Observable<string> {
    this.bo.observe(Breakpoints.XSmall).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(

    (bool) => {
      if (value.length > 20 && bool.matches)
        this.val.next(value.slice(0, 20).concat('...'))
      else
        this.val.next(value);
    })
    return this.val;
  }

}
