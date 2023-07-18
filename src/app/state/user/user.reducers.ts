import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/models/user.model";
import { getUser, getUserSuccess } from "./user.actions";

export interface UserState{
    user: User;
    status: 'fetching' | 'success' | 'error' | 'pending';
}

export const initialUserState: UserState = {
    user: null,
    status: 'pending'
}

export const userReducer = createReducer(
    initialUserState,
    on(getUser, (state: UserState) => (<UserState>{...state, status: 'fetching'})),
    on(getUserSuccess, (state: UserState, { user }) => (<UserState>{ ...state, user, status: 'success'})),
);
