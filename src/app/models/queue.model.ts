import { Track } from "./track.model";

export interface Queue{
    currentPlaying: Track,
    queue: Track[]
}