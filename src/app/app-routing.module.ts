import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GetStartedComponent } from './pages/get-started/get-started.component';
import { authGuard } from './guards/auth.guard';
import { MainComponent } from './pages/home/main/main.component';

const routes: Routes = [
  {path:'', redirectTo: 'get-started', pathMatch: 'full'},
  {path: 'get-started', component: GetStartedComponent},
  {path: 'home', component: HomeComponent, canActivate: [authGuard], children: [
    {path: '', component: MainComponent},
    {path: 'liked-songs', loadChildren: ()=> import('./pages/liked-songs/liked-songs.module')
    .then(m=>m.LikedSongsModule)}
  ]},
  {path: '**', redirectTo: 'get-started'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
