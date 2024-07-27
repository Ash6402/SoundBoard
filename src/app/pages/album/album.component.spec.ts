import { ComponentFixture, TestBed } from "@angular/core/testing"
import { AlbumComponent } from "./album.component"
import { albumMock } from "../../mocks/album.mock";

describe("AlbumComponent", () => {

    let component: AlbumComponent;
    let fixture: ComponentFixture<AlbumComponent>;
    let albumElement: HTMLElement;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [AlbumComponent]
        })

        fixture = TestBed.createComponent(AlbumComponent);
        component = fixture.componentInstance;
        albumElement = fixture.nativeElement;
        fixture.componentRef.setInput('album', albumMock);
        fixture.detectChanges();
    })
    
    it('should create', () => {
        expect(component).toBeDefined()
    })

    it('album should be defined', () => {
        expect(component.album()).toEqual(albumMock)
    })
    
    it('should render album name', () => {
        const el = albumElement.querySelector('p.heading')!
        const albumName = component.album().name;
        expect(el.textContent).toEqual(albumName)
    })
})