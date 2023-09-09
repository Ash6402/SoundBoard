import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, switchMap } from "rxjs";
import { HttpPlayerService } from "src/app/services/http/player/http-player.service";
import { addToQueue, getQueue, getQueueSuccess } from "./queue.actions";

@Injectable()
export class QueueEffects{
    private actions$ = inject(Actions);
    private playerHttpService = inject(HttpPlayerService);
    addToQueue$ = createEffect(()=>
    this.actions$.pipe(
        ofType(addToQueue),
        mergeMap( ({uri}) => this.playerHttpService.addToQueue(uri) ),
        map(() => getQueue()),      
    ))
    
    getQueue$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getQueue),
        switchMap(() => this.playerHttpService.getQueue()),
        map(({queue, currentPlaying}) => getQueueSuccess({queue, currentPlaying})),
    ))
}