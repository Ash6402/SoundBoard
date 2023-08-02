import { NgModule } from "@angular/core";
import { GetStartedModule } from "./get-started/get-started.module";
import { HomeModule } from "./home/home.module";
import { LikedSongsModule } from "./liked-songs/liked-songs.module";

@NgModule({
    declarations: [],

    imports: [
        GetStartedModule,
        HomeModule,
        LikedSongsModule,
    ],

    exports: [],
})

export class PagesModule{}