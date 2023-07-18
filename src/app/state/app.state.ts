import { AuthState } from "./auth/auth.reducers";
import { UserState } from "./user/user.reducers";

export interface AppState{
    auth: AuthState,
    user: UserState,
}