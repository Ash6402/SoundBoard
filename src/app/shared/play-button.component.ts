import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <button mat-mini-fab color="primary">
      <mat-icon>play_arrow</mat-icon>
    </button>
  `,
  styles: []
})
export class PlayButtonComponent {

}
