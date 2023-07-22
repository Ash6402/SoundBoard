import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PlayerSDKSerivce } from "src/app/services/http/player/player-sdk.service";
import { actionSuccess, seek, toggle } from "./player.actions";
import { map, of, switchMap } from "rxjs";

export class PlayerEffects{
    private actions$ = inject(Actions);
    private playerSDKService = inject(PlayerSDKSerivce);
    toggle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(toggle),
            switchMap( () => this.playerSDKService.togglePlay()),
            map(() => actionSuccess()),
        )
    );

    seek$ = createEffect(()=>
        this.actions$.pipe(
            ofType(seek),
            switchMap(({position})=> of(this.playerSDKService.seekToPosition(position)) ),
            map(()=> actionSuccess()),
        )
    )
}