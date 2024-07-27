import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Album } from "src/app/models/album.model";
import { Albums } from "src/app/models/albums.model";
import { Artist } from "src/app/models/artist.model";
import { Track } from "src/app/models/track.model";
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
    
  getSavedTracks(url: string = `${environment.apiUrl}/tracks`){ 
    return this.http.get<Tracks>(url,
    {
      params: new HttpParams().set('limit', 50),
    });
  }

  removeFromLiked(id: string){
    return this.http.delete(`${environment.apiUrl}/tracks`, {
      params: new HttpParams().set('ids', id),
    });    
  }

  addToLiked(id: string){
    return this.http.put(`${environment.apiUrl}/tracks`,{}, {
      params: new HttpParams().set('ids', id),
    });
  }

  getTrack(id: string){
    return this.http.get<Track>(`${environment.api}/tracks/${id}`)
  }

  getArtist(id: string){
    return this.http.get<Artist>(`${environment.api}/artists/${id}`)
  }

  getTopTracksOfArtist(id: string){
    return this.http.get<{tracks: Track[]}>(`${environment.api}/artists/${id}/top-tracks`)
  }

  getAlbumsOfArtist(id: string, limit: number, offset: number = 0){
    return this.http.get<Albums>(`${environment.api}/artists/${id}/albums`, {
      params: new HttpParams()
                .set("include_groups", "album")
                .set("limit", limit)
                .set("offset", offset)
    })
  }

  getAlbum(id: string){
    return this.http.get<Album>(`${environment.api}/albums/${id}`)
  }

  isFollowing(id: string, type: string){
    return this.http.get<boolean[]>(`${environment.apiUrl}/following/contains`,
      {
        params: new HttpParams().set("type", type).set("ids", id)
      }
    )
  }

  follow(id: string, type: string){
    return this.http.put<null>(`${environment.apiUrl}/following`, {}, {
      params: new HttpParams().set("type", type).set("ids", id)
    })
  }

  unfollow(id: string, type: string){
    return this.http.delete<null>(`${environment.apiUrl}/following`, {
      params: new HttpParams().set("type", type).set("ids", id)
    })
  }
}