import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ResolveEnd, ResolveStart, Router, mapToCanActivate } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterEventsService {
  router = inject(Router);
  isResolving = toSignal(this.router.events.pipe(
    map((e) => {
      if(e instanceof ResolveStart) return true
      else if(e instanceof ResolveEnd) return false
    })
  ))
}
