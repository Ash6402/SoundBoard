import { createReducer, on } from "@ngrx/store";
import { getAccessToken, getTokenSuccess } from "./auth.actions";

export interface AuthState{
    status: 'success' | 'pending' | 'error' | 'fetching',
}

export const initialAuthState: AuthState = {
    status: 'pending',
}

export const AuthReducer = createReducer(
    initialAuthState,
    on(getAccessToken, (state: AuthState) => (<AuthState>{...state, status: 'fetching'})),
    on(getTokenSuccess, (state: AuthState) => (<AuthState>{...state, status: 'success'}))
)