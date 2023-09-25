import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { LikedSongsState } from "./liked-songs.reducers";

export const likedSongsState = (state: AppState) => state.likedSongs;

export const likedSongs = createSelector(
    likedSongsState,
    (state: LikedSongsState) => state.tracks, 
)