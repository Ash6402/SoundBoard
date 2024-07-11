import { SimplifiedArtist } from "./simplified-artist.model"

export interface SimplifiedAlbum{
    album_type: string,
    total_tracks: number,
    available_markets: string[]
    external_urls: {
        spotify: string,
    }
    href: string,
    id: string,
    images: {
        url: string,
        height: number,
        width: number,
    },
    name: string,
    release_date: string,
    release_date_precision: string,
    restrictions: {
        reason: string,
    },
    type: string,
    uri: string,
    artists: SimplifiedArtist[],
    album_group: string,
}