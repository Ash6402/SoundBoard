import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addSongs, addToLiked, fetchLikedSongs, fetchSuccess, removeFromLiked } from "./liked-songs.actions";
import { EMPTY, expand, map, switchMap } from "rxjs";
import { HttpGeneralService } from "src/app/services/http/general/http-general.service";
import { Store } from "@ngrx/store";

@Injectable()
export class LikedSongsEffects{
    private actions$ = inject(Actions);
    private httpGeneralService = inject(HttpGeneralService);
    private store = inject(Store);

    fetchLikedSongs$ = createEffect(() => 
        this.actions$.pipe(
            ofType(fetchLikedSongs),
            switchMap(() => {
                return this.httpGeneralService.getSavedTracks()}),
            expand((res) => {
                this.store.dispatch(addSongs({tracks: res.items.flatMap((item)=>item.track)}));
                return res.next ? this.httpGeneralService.getSavedTracks(res.next) : EMPTY
            }),
            map(() => fetchSuccess()),
        ),
    );

    addToLikedSongs$ = createEffect(() => 
        this.actions$.pipe(
            ofType(addToLiked),
            switchMap(({id}) => this.httpGeneralService.addToLiked(id)),
        ), {dispatch: false}
    )

    removeFromLiked$ = createEffect(() => 
        this.actions$.pipe(
            ofType(removeFromLiked),
            switchMap(({id}) => this.httpGeneralService.removeFromLiked(id)),
        ), {dispatch: false}
    );
}