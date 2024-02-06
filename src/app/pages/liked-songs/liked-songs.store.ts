import { Injectable, inject } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { EMPTY, Observable, expand, first, map, mergeMap, switchMap } from "rxjs";
import { Track } from "src/app/models/track.model";
import { HttpGeneralService } from "src/app/services/http/general/http-general.service";
import { HttpPlayerService } from "src/app/services/http/player/http-player.service";

export class LikedSongsState{
    tracks: Track[];
}

@Injectable()
export class LikedSongsStore extends ComponentStore<LikedSongsState>{
    private httpPlayerService = inject(HttpPlayerService);
    private httpGeneralService = inject(HttpGeneralService);

    constructor(){super({tracks: []})}

    readonly tracks$: Observable<Track[]> = this.select(state => state.tracks);

    addTracks(tracks: Track[]){
        this.setState((state) => ({...state, tracks: [ ...state.tracks, ...tracks]}));
    }

    remove(id: string){
        this.setState((state) => ({...state, tracks: [...state.tracks.filter((track) => track.id !== id)]}))
    }

    getSongs = this.effect<void>(()=>
        this.httpGeneralService.getSavedTracks().pipe(
            expand((res)=>{
              this.addTracks(res.items.flatMap((item)=>item.track));
              return res.next ? this.httpGeneralService.getSavedTracks(res.next) : EMPTY
            }
        )
    ))

    addOrRemove = this.effect(($: Observable<string>) => $.pipe(
        mergeMap((id)=>
            this.tracks$.pipe(
                first(),
                switchMap((tracks) => this.removeFromLiked(id),
                ))
            )
        ))

    removeFromLiked(id: string){
        return this.httpGeneralService.removeFromLiked(id)
        .pipe(map(() => this.remove(id)
        ))
    }

}