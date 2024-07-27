import { ResolveFn } from "@angular/router";
import { Observable } from "rxjs";
import { Album } from "../models/album.model";
import { inject } from "@angular/core";
import { HttpGeneralService } from "../services/http/general/http-general.service";

export const albumResolver: ResolveFn<Observable<Album>> = (route, state) => {
    return inject(HttpGeneralService).getAlbum(route.params?.id)
}