import { createAction, props } from "@ngrx/store";
import { PlayerState } from "./player.reducers";

export const initializePlayer = createAction("[Player Component] Initialize Player");
export const play = createAction('[Player Component] Play Song', props<{uris: string[]}>());
export const toggle = createAction("[Player Component] Toggle Song");
export const continuePlaying = createAction("[Player Component] Continue Progress");
export const increment = createAction("[Player Component] Increment Progress");
export const next = createAction("[Player Component] Play Next");
export const previous = createAction("[Player Component] Play Previous");
export const seek = createAction("[Player Component] Seek To Postion", props<{position: number}>());
export const actionSuccess = createAction("[Player Component] Action Success");
export const actionFailure = createAction("[Player Component] Action Failure");
export const change = createAction("[Player Component] State Changed",
 props<{state: PlayerState}>());