import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaProgressBarComponent } from './media-progress-bar.component';

describe('MediaProgressBarComponent', () => {
  let component: MediaProgressBarComponent;
  let fixture: ComponentFixture<MediaProgressBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MediaProgressBarComponent]
});
    fixture = TestBed.createComponent(MediaProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
