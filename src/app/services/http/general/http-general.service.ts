import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment.development";

@Injectable({providedIn: 'root'}) 

export class HttpGeneralService{
    http = inject(HttpClient);
    search(query: string){
        this.http.get(`${environment.api}/get`, {
            params: new HttpParams().set('q', query)
        })
    }
}