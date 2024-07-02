import { createReducer, on } from "@ngrx/store";
import { actionSuccess, change, continuePlaying, increment, seek, setLoading, toggle } from "./player.actions";

export interface PlayerState{
    paused: boolean;
    currentPlaying: Spotify.Track;
    next: Spotify.Track;
    loading: boolean,
    previous: Spotify.Track;
    duration: number;
    progress: number;
    status?: null | 'error' | 'success',
    ready?: boolean,
}

export const initialState: PlayerState = {
    paused: true,
    currentPlaying: null,
    next: null,
    loading: true,
    previous: null,
    duration: 0,
    progress: 0,
    status: null,
    ready: false,
}

export const playerReducer = createReducer(
    initialState,
    on(toggle, (state) => ({...state, paused: !state.paused})),
    on(actionSuccess, (state) => (<PlayerState>{...state, status: 'success' })),
    on(change, (state, {state: changedState}) => 
    (<PlayerState>{...state, ...changedState, status: 'success', ready: true})),
    on(seek, (state, {position}) =>  ({...state, progress: position, paused: true})),
    on(continuePlaying, (state) => ({...state, paused: false})),
    on(increment, (state) => ({...state, progress: state.progress + 1000})),
    on(setLoading, (state, {loading}) => ({...state, loading}))
)