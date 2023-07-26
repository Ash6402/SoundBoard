import { Injectable, inject } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { EMPTY, Observable, expand, map } from "rxjs";
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

    addSongs(tracks: Track[]){
        this.setState((state) => ({...state, tracks: [ ...state.tracks, ...tracks]}));
    }

    getSongs(){
        this.effect<void>(()=>
        this.httpPlayerService.getSavedTracks().pipe(
            expand((res)=>{
              this.addSongs(res.items.flatMap((item)=>item.track));
              return res.next ? this.httpPlayerService.getSavedTracks(res.next) : EMPTY
            })
        ))
    }
}