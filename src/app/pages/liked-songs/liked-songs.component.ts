import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, inject } from '@angular/core';
import { HttpPlayerService } from 'src/app/services/http/player/http-player.service';
import { LikedSongsStore } from './liked-songs.store';
import { CurrentPageService } from 'src/app/services/current-page.service';

@Component({
  selector: 'app-liked-songs',
  templateUrl: './liked-songs.component.html',
  styleUrls: ['./liked-songs.component.scss'],
  providers: [LikedSongsStore],
  animations: [
    trigger('listAnimation', [
      transition('*<=>*', [
        query(':enter', [
          style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))
        ],{optional: true}),
      ]),
    ]),
  ]
})
export class LikedSongsComponent implements OnInit {

  componentStore = inject(LikedSongsStore);
  savedTracks = this.componentStore.tracks$;
  httpPlayer = inject(HttpPlayerService);
  currentPageService = inject(CurrentPageService);

  ngOnInit(): void {
    this.componentStore.getSongs();
    this.currentPageService.currentPage$.next("Liked Songs");
  }

  addOrRemove(id: string){
    this.componentStore.addOrRemove(id);
  }
}
