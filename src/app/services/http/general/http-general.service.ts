import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Tracks } from "src/app/models/tracks.model";
import { environment } from "src/environments/environment.development";

@Injectable({providedIn: 'root'}) 

export class HttpGeneralService{
    private http = inject(HttpClient);
    search(query: string){
        return this.http.get(`${environment.api}/search`, {
            params: new HttpParams().set('q', query).set('type', "track"),
        })
    }
}