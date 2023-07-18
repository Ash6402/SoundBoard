import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/models/user.model";
import { getUser, getUserFailure, getUserSuccess } from "./user.actions";

export interface UserState{
    user: User;
    error: string | null;    
    status: 'fetching' | 'success' | 'error' | 'pending';
}

export const initialUserState: UserState = {
    user: null,
    error: null,
    status: 'pending'
}

export const userReducer = createReducer(
    initialUserState,
    on(getUser, (state: UserState) => (<UserState>{...state, status: 'fetching'})),
    on(getUserSuccess, (state: UserState, { user }) => (<UserState>{ ...state, user, status: 'success'})),
    on(getUserFailure, (state: UserState, { error }) => (<UserState>{...state, user: null, status: 'error', error}))
);
