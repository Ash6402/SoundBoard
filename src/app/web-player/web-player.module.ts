import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebPlayerComponent } from './web-player.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip';
 


@NgModule({
  declarations: [WebPlayerComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [
    WebPlayerComponent,
  ]
})
export class WebPlayerModule { }
