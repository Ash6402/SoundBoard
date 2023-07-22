import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { PlayerState } from "./player.reducers";

export const selectPlayer = (state: AppState) => state.player;
export const currentPlaying = createSelector(
    selectPlayer,
    (state: PlayerState) => state.currentPlaying,
)

export const paused = createSelector(
    selectPlayer,
    (state: PlayerState) => state.paused,
)
export const position = createSelector(
    selectPlayer,
    (state: PlayerState) => state.progress,
)

export const duration = createSelector(
    selectPlayer,
    (state: PlayerState) => state.duration,
)

export const next = createSelector(
    selectPlayer,
    (state: PlayerState) => state.next,
)

export const ready = createSelector(
    selectPlayer, 
    (state: PlayerState) => state.ready,
)