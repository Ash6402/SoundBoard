import { SimplifiedAlbum } from "./simplified-album.model";

export interface Albums{
    href: string,
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number,
    items: SimplifiedAlbum[]
}