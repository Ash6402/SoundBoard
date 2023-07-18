import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserState } from "./user.reducers";


export const selectUserState = (state: AppState) => state.user;

export const selectUser = createSelector(
    selectUserState,
    (state: UserState) => state.user,
)