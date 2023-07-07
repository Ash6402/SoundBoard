import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { HomeComponent } from './home.component';
import { WebPlayerComponent } from '../web-player/web-player.component';
import { WebPlayerModule } from '../web-player/web-player.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    WebPlayerModule,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
