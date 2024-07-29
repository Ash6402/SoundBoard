import { SimplifiedArtist } from "./simplified-artist.model"
import { Tracks } from "./tracks.model"

export interface Album{
    album_type: string,
    total_tracks: number,
    available_markets: string[],
    external_urls: {
        spotify: string,
    },
    href: string,
    id: string,
    images: {
        url: string,
        height: number,
        width: number,
    }[],
    name: string,
    release_date: string,
    release_date_precision: string,
    restrictions?: {
        reason: string,
    },
    type: string,
    uri: string,
    artists: SimplifiedArtist[],
    tracks: Tracks,
    copyrights: {
        text: string,
        type: string
    }[],
    external_ids?: {
        isrc?: string,
        ean?: string,
        upc?: string,
    },
    genres: string[],
    label: string,
    popularity: number,
}