import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { QueueState } from "./queue.reducer";

export const selectQueueState = (state: AppState) => state.queue;

export const selectQueue = createSelector(
    selectQueueState,
    (state: QueueState) => state.queue,
)