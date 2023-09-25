import { createReducer, on } from "@ngrx/store";
import { add, addSongs, addToLiked, clearState, fetchLikedSongs, removeFromLiked } from "./liked-songs.actions";
import { Track } from "src/app/models/track.model";

export interface LikedSongsState{
    tracks: Track[];
    fetching: boolean;
}

export const initialState: LikedSongsState = {
    tracks: [],
    fetching: false,
}

export const likedSongsReducer = createReducer(
    initialState,
    on(fetchLikedSongs, (state) => ({...state, fetching: true})),
    on(addSongs, (state, { tracks }) => ({...state, fetching: false, tracks: [...state.tracks, ...tracks]})),
    on(removeFromLiked, (state, {id}) => ({...state, tracks: state.tracks.filter(item => item.id !== id)})),
    on(clearState, (state) => ({...state, tracks: []})),
)