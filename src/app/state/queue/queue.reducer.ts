import { createReducer, on } from "@ngrx/store";
import { Track } from "src/app/models/track.model";
import { getQueue, getQueueSuccess } from "./queue.actions";

export interface QueueState{
    currentPlaying: Track;
    queue: Track[],
    status: null | 'fetching' | 'success' | 'error',
}

export const initialQueueState: QueueState = {
    currentPlaying: null,
    queue: [],
    status: null,
}

export const queueReducer = createReducer(
    initialQueueState,
    on(getQueue, (state: QueueState) => <QueueState>{...state, status: 'fetching'}),
    on(getQueueSuccess, (state: QueueState, {queue, currentPlaying}) => <QueueState>{...state, queue, currentPlaying, status: 'success' })
)