import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { PlayerState } from "./player.reducers";

export const playerState = (state: AppState) => state.player;
export const currentPlaying = createSelector(
    playerState,
    (state: PlayerState) => state.currentPlaying,
)

export const paused = createSelector(
    playerState,
    (state: PlayerState) => state.paused,
)

export const position = createSelector(
    playerState,
    (state: PlayerState) => state.progress,
)

export const duration = createSelector(
    playerState,
    (state: PlayerState) => state.duration,
)

export const next = createSelector(
    playerState,
    (state: PlayerState) => state.next,
)

export const ready = createSelector(
    playerState, 
    (state: PlayerState) => state.ready,
)

export const isLoading = createSelector(
    playerState,
    (state: PlayerState) => state.loading,
)