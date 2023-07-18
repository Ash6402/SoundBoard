import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export const getUser = createAction("[Home Component] Get User");
export const getUserSuccess = createAction("[Home Component] Get User Success",
props<{user: User}>());