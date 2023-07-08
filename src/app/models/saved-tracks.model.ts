import { Track } from "./track.model"

export interface SavedTracks{
    href: string,
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number,
    items: [{ added_at: string, track: Track,}]
}