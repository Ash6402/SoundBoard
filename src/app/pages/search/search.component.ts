import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { SearchStore } from './search.store';
import { HttpGeneralService } from 'src/app/services/http/general/http-general.service';
import { Store } from '@ngrx/store';
import { add, addToLiked } from 'src/app/state/liked-songs/liked-songs.actions';
import { AsyncPipe } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { IsLikedDirective } from '../../shared/is-liked.directive';
import { TrackItemComponent } from '../../shared/track-item/track-item.component';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton, MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SearchStore],
    standalone: true,
    imports: [
        MatFormField,
        MatLabel,
        MatInput,
        MatMiniFabButton,
        MatSuffix,
        MatIcon,
        TrackItemComponent,
        IsLikedDirective,
        MatIconButton,
        MatTooltip,
        AsyncPipe,
    ],
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