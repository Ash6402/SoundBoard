import { createAction, props } from "@ngrx/store";
import { Track } from "src/app/models/track.model";

export const addToQueue = createAction("[Queue Menu Add to Queue]",
 props<{uri: string}>());
export const getQueue = createAction("[Queue Menu] Get Queue");
export const getQueueSuccess = createAction("[Queue Menu] Get Queue Success",
props<{queue: Track[], currentPlaying: Track}>());
export const getQueueFailure = createAction("[Queue Menu] Get Queue Failure");