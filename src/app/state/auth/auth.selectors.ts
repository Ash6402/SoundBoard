// import { createSelector, select } from "@ngrx/store";
import { AppState } from "../app.state";
// import { AuthState } from "./auth.reducers";

export const selectAuth = (state: AppState) => state.auth;

// export const selectAuthState = createSelector(
//     selectAuth, 
//     (state: AuthState) => state.accessToken,
// )