import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export const getUser = createAction("[Home Page] Get User");

export const getUserSuccess = createAction("[Home Page] Get User Success",
props<{user: User}>());

export const getUserFailure = createAction("[Home Page] Get User Failure",
props<{error: string}>());

export const signOut = createAction("[SignOut Component] SignOut")

// using property named typeOf instead of type because if I use type I get an error that
// action creator cannot return an object having a property of type

export const follow = createAction("[Artist/User Component] Follow Artist/User",
props<{id: string, typeOf: string}>())

export const unfollow = createAction("[Artist/User Component] Unfollow Artist/User", 
props<{id: string, typeOf: string}>())