import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GetStartedComponent } from './get-started/get-started.component';

const routes: Routes = [
  {path:'', redirectTo: 'get-started', pathMatch: 'full'},
  {path: 'get-started', component: GetStartedComponent},
  {path: 'home', component: HomeComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
