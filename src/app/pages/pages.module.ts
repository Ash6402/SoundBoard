import { NgModule } from "@angular/core";
import { GetStartedModule } from "./get-started/get-started.module";
import { HomeModule } from "./home/home.module";
import { LikedSongsModule } from "./liked-songs/liked-songs.module";
import { SearchComponent } from './search/search.component';

@NgModule({
    declarations: [
    SearchComponent
  ],

    imports: [
        GetStartedModule,
        HomeModule,
        LikedSongsModule,
    ],

    exports: [],
})

export class PagesModule{}