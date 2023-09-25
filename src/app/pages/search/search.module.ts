import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TrackItemComponent } from 'src/app/shared/track-item/track-item.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    TrackItemComponent,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [
    SearchComponent,
  ]
})
export class SearchModule { }
