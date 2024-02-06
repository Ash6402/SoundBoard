import { NgModule } from "@angular/core";


import { LikedSongsModule } from "./liked-songs/liked-songs.module";

import { SingleSongViewComponent } from './single-song-view/single-song-view.component';

@NgModule({
    imports: [
    LikedSongsModule,
    SingleSongViewComponent,
],
    exports: [],
})

export class PagesModule{}