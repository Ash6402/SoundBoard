import { NgModule } from "@angular/core";
import { GetStartedModule } from "./get-started/get-started.module";
import { HomeModule } from "./home/home.module";
import { LikedSongsModule } from "./liked-songs/liked-songs.module";
import { SearchModule } from "./search/search.module";

@NgModule({
  declarations: [],
  imports: [
    GetStartedModule,
    HomeModule,
    LikedSongsModule,
    SearchModule,
  ],
  exports: [],
})

export class PagesModule{}