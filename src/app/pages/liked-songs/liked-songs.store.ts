import { Injectable, inject } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { EMPTY, Observable, expand, first, iif, map, mergeMap, of, switchMap } from "rxjs";
import { Track } from "src/app/models/track.model";
import { HttpPlayerService } from "src/app/services/http/player/http-player.service";

export class LikedSongsState{
    tracks: Track[];
}

@Injectable()
export class LikedSongsStore extends ComponentStore<LikedSongsState>{
    private httpPlayerService = inject(HttpPlayerService);

    constructor(){super({tracks: []})}

    readonly tracks$: Observable<Track[]> = this.select(state => state.tracks);

    addTracks(tracks: Track[]){
        this.setState((state) => ({...state, tracks: [ ...state.tracks, ...tracks]}));
    }

    remove(id: string){
        this.setState((state) => ({...state, tracks: [...state.tracks.filter((track) => track.id !== id)]}))
    }

    getSongs = this.effect<void>(()=>
        this.httpPlayerService.getSavedTracks().pipe(
            expand((res)=>{
              this.addTracks(res.items.flatMap((item)=>item.track));
              return res.next ? this.httpPlayerService.getSavedTracks(res.next) : EMPTY
        })
    ))

    addOrRemove = this.effect(($: Observable<string>) => $.pipe(
        mergeMap((id)=>
            this.tracks$.pipe(
                first(),
                switchMap((tracks) => {
                return iif(() => tracks.find((track => track.id===id))===undefined,
                this.addToLiked(id),
                this.removeFromLiked(id),
                )})
            )
        ))
    )

    removeFromLiked(id: string){
        console.log(true);
        return this.httpPlayerService.removeFromLiked(id)
        .pipe(map(() => {
            return this.remove(id);
        }))
    }

    addToLiked(id: string){
        console.log(false);
        return of('');
    }
}