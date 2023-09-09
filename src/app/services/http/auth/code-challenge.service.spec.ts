import { TestBed } from '@angular/core/testing';

import { CodeChallengeService } from './code-challenge.service';

describe('CodeChallengeService', () => {
  let service: CodeChallengeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeChallengeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
