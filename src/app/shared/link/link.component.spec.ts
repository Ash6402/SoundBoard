import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkComponent } from './link.component';
import { artistMock } from '../../mocks/artist.mock';
import { ActivatedRoute } from '@angular/router';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkComponent],
      providers: [{
        provide: ActivatedRoute,
        useValue: {}
      }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('artist', artistMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define the artist', () => {
    const artist = component.artist();
    expect(artist).toBeTruthy();
  })

  it('_artist should parse id from the uri from artist',() => {
    fixture.componentRef.setInput('artist', {
      ...artistMock,
      id: undefined
    })

    expect(component.artist().id).toBeUndefined()
    expect(component._artist().id).toBe(artistMock.id)
  })
});
