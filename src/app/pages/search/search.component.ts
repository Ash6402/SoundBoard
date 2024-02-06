import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { SearchStore } from './search.store';
import { HttpGeneralService } from 'src/app/services/http/general/http-general.service';
import { Store } from '@ngrx/store';
import { add, addToLiked } from 'src/app/state/liked-songs/liked-songs.actions';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchStore],
})
export class SearchComponent implements OnInit {
  currentPageService = inject(CurrentPageService);
  httpGeneralService = inject(HttpGeneralService);
  destroyRef = inject(DestroyRef);
  appStore = inject(Store);
  store = inject(SearchStore);
  tracks$ = this.store.tracks;

  ngOnInit(): void {
    this.store.setState({
      tracks: [], 
      searching: false
    });

    this.currentPageService.currentPage$.next("Search");
  }

  search(query: string){
    this.store.search(query);
  }
  
  addToLiked(id: string, iconEl, track){
    iconEl._elementRef.nativeElement.innerText = "favorite";
    this.appStore.dispatch(addToLiked({id}));
    this.appStore.dispatch(add({track}));
  }
}