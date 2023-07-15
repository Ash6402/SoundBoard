import { Track } from "./track.model";

export interface Queue{
    current_playing: Track,
     queue: Track[]
}