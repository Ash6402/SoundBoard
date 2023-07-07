import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebPlayerComponent } from './web-player.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [WebPlayerComponent],
  imports: [
    CommonModule,
    MatCardModule,
  ],
  exports: [
    WebPlayerComponent,
  ]
})
export class WebPlayerModule { }
