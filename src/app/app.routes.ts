import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GetStartedComponent } from './pages/get-started/get-started.component';
import { authGuard } from './guards/auth.guard';
import { MainComponent } from './pages/home/main/main.component';
import { SearchComponent } from './pages/search/search.component';
import { LikedSongsComponent } from './pages/liked-songs/liked-songs.component';
import { TrackDetailsPageComponent } from './pages/track-details/track-details.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { artistResolver } from './resolvers/artist.resolver';
import { AlbumComponent } from './pages/album/album.component';
import { albumResolver } from './resolvers/album.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: MainComponent,
        title: "Home"
      },
      { 
        path: 'liked-songs',
        component: LikedSongsComponent,
        title: "Liked Songs"
      },
      {
        path: 'search',
        component: SearchComponent,
        title: 'Search'
      },
      {
        path: 'track/:id', 
        component: TrackDetailsPageComponent,
        title: 'Track' 
      },
      {
        path: 'artist/:id', 
        component: ArtistComponent, 
        resolve: {artist: artistResolver},
        title: 'Artist'
      },
      {
        path: 'album/:id',
        component: AlbumComponent,
        resolve: {album: albumResolver},
        title: 'Album'
      }
    ]
  },
  {
    path: 'get-started', 
    component: GetStartedComponent
  },
  {
    path: '**', 
    redirectTo: ''
  },
];