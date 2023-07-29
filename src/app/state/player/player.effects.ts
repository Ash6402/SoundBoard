import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PlayerSDKSerivce } from "src/app/services/http/player/player-sdk.service";
import { actionSuccess, initializePlayer, next, play, previous, seek, toggle } from "./player.actions";
import { map, switchMap, tap } from "rxjs";
import { HttpPlayerService } from "src/app/services/http/player/http-player.service";

@Injectable()
export class PlayerEffects{
    private actions$ = inject(Actions);
    private playerSDKService = inject(PlayerSDKSerivce);
    private playerHttpService = inject(HttpPlayerService);

    initialize$ = createEffect(()=>
    this.actions$.pipe(
        ofType(initializePlayer),
        tap(()=> this.playerSDKService.initializePlayer())
    ), {dispatch: false});

    play$ = createEffect(()=>
    this.actions$.pipe(
        ofType(play),

    ))

    toggle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(toggle),
            switchMap( () => this.playerSDKService.togglePlay()),
            map(() => actionSuccess()),
        )
    );

    next$ = createEffect(()=>
    this.actions$.pipe(
        ofType(next),
        switchMap(()=> this.playerSDKService.nextPlay()),
        map(()=> actionSuccess()),
    ));

    previous$ = createEffect(() => 
    this.actions$.pipe(
        ofType(previous),
        switchMap(()=> this.playerSDKService.previousPlay()),
        map(()=> actionSuccess()),
    ));

    seek$ = createEffect(()=>
        this.actions$.pipe(
            ofType(seek),
            switchMap(({position})=> this.playerHttpService.seekToPosition(position)),
            map(() => actionSuccess()),
        )
    );
}