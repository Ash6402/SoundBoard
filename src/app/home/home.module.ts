import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button'
import { WebPlayerModule } from '../web-player/web-player.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    WebPlayerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
