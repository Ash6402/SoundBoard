import { DestroyRef, Directive, Input, OnInit, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { likedSongs } from "../state/liked-songs/liked-songs.selectors";
import { Track } from "../models/track.model";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { map } from "rxjs";
import { MatIcon } from "@angular/material/icon";

@Directive({
    selector: '[isLiked]',
    standalone: true,
})

export class IsLikedDirective implements OnInit {
    private store = inject(Store);
    @Input('isLiked') track: Track;
    @Input('icon') icon: MatIcon
    private likedSongs$ = this.store.select(likedSongs); 
    destroyRef = inject(DestroyRef);

    ngOnInit(): void {
        this.likedSongs$.pipe(takeUntilDestroyed(this.destroyRef),
        map((list) => list.flatMap(el => el.uri)))
        .subscribe((list) => {
            if(list.indexOf(this.track.uri) > -1)
                this.icon._elementRef.nativeElement.innerText = 'favorite';
        })
    }
}
