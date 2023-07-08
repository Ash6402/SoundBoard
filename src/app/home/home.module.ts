import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button'
import { WebPlayerModule } from '../web-player/web-player.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    WebPlayerModule,
    MatButtonModule,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
