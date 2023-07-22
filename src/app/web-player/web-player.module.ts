import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebPlayerComponent } from './web-player.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip';
import { DurationConverterPipe } from '../pipes/duration-converter.pipe';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu'
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlayerButtonsComponent } from './player-buttons/player-buttons.component';
import { MediaProgressBarComponent } from './media-progress-bar/media-progress-bar.component';
@NgModule({
  declarations: [
    WebPlayerComponent,
    DurationConverterPipe,
    PlayerButtonsComponent,
    MediaProgressBarComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSliderModule,
    FormsModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    WebPlayerComponent,
  ]
})
export class WebPlayerModule { }
