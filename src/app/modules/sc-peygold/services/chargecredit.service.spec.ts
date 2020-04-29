import { TestBed } from '@angular/core/testing';

import { ChargecreditService } from './chargecredit.service';

describe('ChargecreditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChargecreditService = TestBed.get(ChargecreditService);
    expect(service).toBeTruthy();
  });
});
