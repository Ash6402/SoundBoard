import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DestroyRef, Pipe, PipeTransform, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';


@Pipe({
  name: 'trimmer',
  standalone: true
})
export class TrimmerPipe implements PipeTransform {
  bo = inject(BreakpointObserver);
  destroyRef = inject(DestroyRef);

  transform(value: string, ...args: unknown[]): Observable<string> {
    return this.bo.observe(Breakpoints.XSmall).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((result) => {
        if(value.length > 20 && result.matches)
          return value.slice(0, 20).concat("...")
        else
          return value
        }
      )
    )
  }

}
