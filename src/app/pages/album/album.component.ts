import { Component, Input, input, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album.model';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent implements OnInit {
  
  album = input<Album>();
  
  ngOnInit(): void {
    // console.log(this.album())
  }

}