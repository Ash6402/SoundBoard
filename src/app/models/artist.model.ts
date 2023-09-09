export interface Artist{
    external_urls: {
        spotify: string,
    },
    followers: {
        href: string,
        total: 0
    },
    genres: string[],
    href: string,
    id: string,
    images: [
        {
        url: string,
        height: number,
        width: number
        }
    ],
    name: string,
    popularity: number,
    type: string,
    uri: string
}
