import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'', redirectTo: 'get-started', pathMatch: 'full'},
  {path: 'get-started', component: GetStartedComponent},
  {path: 'home', component: HomeComponent, canActivate: [authGuard]},
  {path: '**', redirectTo: 'get-started'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
