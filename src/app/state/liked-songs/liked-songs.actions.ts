import { createAction, props } from "@ngrx/store";
import { Track } from "src/app/models/track.model";

export const fetchLikedSongs = createAction("[LikedSongs Component] Fetch LikedSongs");
export const addSongs = createAction("[LikedSongs Component] Add Songs", 
props<{tracks: Track[]}>()); 
export const fetchSuccess = createAction("[LikedSongs Component] Fetch Success");
export const addToLiked = createAction("[LikedSongs Component] Add to LikedSongs",
props<{id: string}>());
export const add = createAction("[LikedSongs Component] Add in Array", props<{track: Track}>());
export const removeFromLiked = createAction("[LikedSongs Component] Remove from LikedSongs",
props<{id: string}>());