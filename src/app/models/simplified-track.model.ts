import { SimplifiedArtist } from "./simplified-artist.model";

export interface SimplifiedTrack {
    artists?: SimplifiedArtist[],
    available_markets?: string[],
    disc_number?: number,
    duration_ms?: number,
    explicit?: boolean,
    external_urls?: {
        spotify: string,
    },
    href?: string,
    id?: string,
    is_playable?: boolean,
    linked_from?: {
        external_urls: {
            spotify: string
        },
        href: string,
        id: string,
        type: string,
        uri: string,
    },
    restrictions?: {
        reason: string
    },
    name?: string,
    preview_url?: string,
    track_number?: number,
    type?: string,
    uri?: string,
    is_local?: boolean,
    copyrights?: {
        text: string,
        type: string
    }[],
    external_ids?: {
        isrc: string,
        ean: string,
        upc: string,
    },
    genres?: string[],
    label?: string,
    popularity?: number,
}