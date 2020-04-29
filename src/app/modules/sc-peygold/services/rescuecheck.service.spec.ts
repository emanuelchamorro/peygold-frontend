import { TestBed } from '@angular/core/testing';

import { RescuecheckService } from './rescuecheck.service';

describe('RescuecheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RescuecheckService = TestBed.get(RescuecheckService);
    expect(service).toBeTruthy();
  });
});
