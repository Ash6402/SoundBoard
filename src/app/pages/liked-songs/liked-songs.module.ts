import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LikedSongsComponent } from './liked-songs.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [LikedSongsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([
      {path: '', component: LikedSongsComponent}
    ]),
  ],
  exports: [
    RouterModule,
    LikedSongsComponent],
})
export class LikedSongsModule { }
