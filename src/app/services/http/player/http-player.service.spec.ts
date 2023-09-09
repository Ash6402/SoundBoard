import { TestBed } from '@angular/core/testing';

import { HttpPlayerService } from './http-player.service';

describe('HttpPlayerService', () => {
  let service: HttpPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
