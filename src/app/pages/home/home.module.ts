import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { HomeComponent } from './home.component';
import { WebPlayerModule } from '../../web-player/web-player.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { MainComponentModule } from './main/main.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
