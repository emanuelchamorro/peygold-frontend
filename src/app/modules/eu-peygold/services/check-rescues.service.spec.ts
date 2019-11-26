import { TestBed } from '@angular/core/testing';

import { CheckRescuesService } from './check-rescues.service';

describe('CheckRescuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckRescuesService = TestBed.get(CheckRescuesService);
    expect(service).toBeTruthy();
  });
});
