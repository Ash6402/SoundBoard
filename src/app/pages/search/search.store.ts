import { Injectable, inject } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable, map, switchMap } from "rxjs";
import { Track } from "src/app/models/track.model";
import { Tracks } from "src/app/models/tracks.model";
import { HttpGeneralService } from "src/app/services/http/general/http-general.service";

export interface StoreState{
    tracks: Track[],
}

@Injectable()
export class SearchStore extends ComponentStore<StoreState>{

    service = inject(HttpGeneralService);

    readonly tracks = this.select(state => state.tracks);
    setTracks(tracks: Track[]){
        this.setState((state) => ({...state, tracks: [...tracks]}))
    }
    
    search = this.effect((query$: Observable<string>) => 
        query$.pipe(switchMap((query) => 
            this.service.search(query)),
            map((res: {tracks: Tracks}) => 
                this.setTracks(res.tracks.items.flatMap(item => item.track)
            ))
        )
    )
}