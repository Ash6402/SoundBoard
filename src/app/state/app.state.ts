import { PlayerState } from "./player/player.reducers";
import { QueueState } from "./queue/queue.reducer";
import { UserState } from "./user/user.reducers";

export interface AppState{
    user: UserState,
    player: PlayerState,
    queue: QueueState;
}