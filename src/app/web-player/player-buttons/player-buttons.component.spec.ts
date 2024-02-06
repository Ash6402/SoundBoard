import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerButtonsComponent } from './player-buttons.component';

describe('PlayerButtonsComponent', () => {
  let component: PlayerButtonsComponent;
  let fixture: ComponentFixture<PlayerButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [PlayerButtonsComponent]
});
    fixture = TestBed.createComponent(PlayerButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
