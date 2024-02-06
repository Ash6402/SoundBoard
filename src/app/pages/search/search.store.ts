import { Injectable, inject } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from "rxjs";
import { Track } from "src/app/models/track.model";
import { HttpGeneralService } from "src/app/services/http/general/http-general.service";

export interface StoreState{
    tracks: Track[],
    searching: boolean;
}

@Injectable()
export class SearchStore extends ComponentStore<StoreState>{

    service = inject(HttpGeneralService);

    readonly tracks = this.select(state => state.tracks);
    readonly searching

    setTracks(tracks: Track[]){
        this.setState((state) => ({...state, tracks: [...tracks]}))
    }

    search = this.effect((query$: Observable<string>) => 
        query$.pipe(
            debounceTime(600),
            distinctUntilChanged((prev, curr) => {
                return prev === curr
            }),
            switchMap((query) => 
            this.service.search(query)),
            map((res: {tracks}) => {
                console.log(res);
                this.setTracks(res.tracks.items);
            })
        ))
}