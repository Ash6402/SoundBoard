import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GetStartedComponent } from './pages/get-started/get-started.component';
import { authGuard } from './guards/auth.guard';
import { MainComponent } from './pages/home/main/main.component';
import { SearchComponent } from './pages/search/search.component';
import { LikedSongsComponent } from './pages/liked-songs/liked-songs.component';
import { TrackDetailsPageComponent } from './pages/track-details-page/track-details-page.component';

export const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [authGuard], children: [
    {path: '', component: MainComponent},
    {path: 'liked-songs', component: LikedSongsComponent },
    {path: 'search', component: SearchComponent},
    {path: 'track/:id', component: TrackDetailsPageComponent },
  ]},
  {path: 'get-started', component: GetStartedComponent},
  {path: '**', redirectTo: ''},
];