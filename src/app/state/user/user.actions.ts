import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export const getUser = createAction("[Home Page] Get User");
export const getUserSuccess = createAction("[Home Page] Get User Success",
props<{user: User}>());
export const getUserFailure = createAction("[Home Page] Get User Failure",
props<{error: string}>());