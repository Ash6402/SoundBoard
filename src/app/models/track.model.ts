import { Artist } from "./artist.model"

export interface Track{
    album: {
      album_type: string,
      total_tracks: number,
      available_markets: string[],
      external_urls: {
        spotify: string
      },
      href: string,
      id: string
      images: [
        {
          url: string,
          height: number,
          width: number
        }
      ],
      name: string,
      release_date: string,
      release_date_precision: string,
      restrictions: {
        reason: string,
      },
      type: string,
      uri: string,
      copyrights: [
        {
          text: string,
          type: string
        }
      ],
      external_ids: {
        isrc: string,
        ean: string,
        upc: string
      },
      genres: string[],
      label: string,
      popularity: 0,
      album_group: string,
      artists: [
        {
          external_urls: {
            spotify: string
          },
          href: string,
          id: string,
          name: string,
          type: string,
          uri: string
        }
      ]
    },
    artists: Artist[],
    available_markets: string[],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_ids: {
      isrc: string,
      ean: string,
      upc: string,
    },
    external_urls: {
      spotify: string
    },
    href: string,
    id: string,
    is_playable: boolean,
    linked_from: {
    },
    restrictions: {
      reason: string
    },
    name: string,
    popularity: number,
    preview_url: string,
    track_number: number,
    type: string,
    uri: string,
    is_local: boolean,
  }