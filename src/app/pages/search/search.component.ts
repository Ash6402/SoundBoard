import { Component, OnInit, inject } from '@angular/core';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { SearchStore } from './search.store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchStore],
})
export class SearchComponent implements OnInit {
  currentPageService = inject(CurrentPageService);
  store = inject(SearchStore);
  ngOnInit(): void {
    this.store.setState({tracks: []});
    this.currentPageService.currentPage$.next("Search");
  }

  search(query: string){
    this.store.search(query);
  }
  
}
