import { TestBed } from '@angular/core/testing';

import { CreditDestinationsService } from './credit-destinations.service';

describe('CreditDestinationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreditDestinationsService = TestBed.get(CreditDestinationsService);
    expect(service).toBeTruthy();
  });
});
