import { NgModule } from "@angular/core";
import { GetStartedModule } from "./get-started/get-started.module";
import { HomeModule } from "./home/home.module";
import { LikedSongsModule } from "./liked-songs/liked-songs.module";
import { SearchModule } from "./search/search.module";
import { SingleSongViewComponent } from './single-song-view/single-song-view.component';

@NgModule({
  declarations: [
    SingleSongViewComponent
  ],
  imports: [
    GetStartedModule,
    HomeModule,
    LikedSongsModule,
    SearchModule,
  ],
  exports: [],
})

export class PagesModule{}