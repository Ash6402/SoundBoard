import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { HomeComponent } from './home.component';
import { WebPlayerModule } from '../../web-player/web-player.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { MainComponentModule } from './main/main.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainComponentModule,
    MatCardModule,
    WebPlayerModule,
    MatSnackBarModule,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
