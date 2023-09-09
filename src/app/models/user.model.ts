export interface User {
    display_name: string,
    country: string,
    email: string,
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean,
    },
    external_urls: {
        spotify: string,
        [key: string]: string
    }, 
    followers: {
        total: number,
        href: string,
        [key:string ]: string | number,
    },
    href: string,
    id: string,
    images: [],
    product: string,
    type: string,
    uri: string,
}
