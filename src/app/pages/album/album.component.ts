import { Component, input } from '@angular/core';
import { Album } from 'src/app/models/album.model';
import { LinkComponent } from 'src/app/shared/link/link.component';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [LinkComponent],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent{
  
  album = input<Album>();
  
}