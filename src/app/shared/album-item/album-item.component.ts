import { DatePipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SimplifiedAlbum } from 'src/app/models/simplified-album.model';
import { ShortnerPipe } from 'src/app/pipes/shortner.pipe';

@Component({
  selector: 'app-album-item',
  standalone: true,
  imports: [MatCardModule, ShortnerPipe, DatePipe],
  template: `
    <mat-card class="card" appearance="raised">
      <div class="img-container">
        @let image = album().images[0];
        <img mat-card-image [src]="image.url" alt="album-cover">
      </div>
        <mat-card-content>
          <mat-card-title><p class="title">{{ album().name | shortner:20 }}</p></mat-card-title>
          <mat-card-subtitle>
            <strong>
              {{ album().release_date | date:"yyyy" }} - {{ album().album_type }}
            </strong>
          </mat-card-subtitle>
        </mat-card-content>
    </mat-card> 
  `,
  styleUrl: './album-item.component.scss'
})
export class AlbumItemComponent {
  album = input.required<SimplifiedAlbum>();

  appearance = signal<string>("outlined")
}
