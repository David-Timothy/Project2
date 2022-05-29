import { TestBed } from '@angular/core/testing';

import { AchievmentService } from './achievment.service';

describe('AchievmentService', () => {
  let service: AchievmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AchievmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
