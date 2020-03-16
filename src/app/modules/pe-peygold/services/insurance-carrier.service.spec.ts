import { TestBed } from '@angular/core/testing';

import { InsuranceCarrierService } from './insurance-carrier.service';

describe('InsuranceCarrierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsuranceCarrierService = TestBed.get(InsuranceCarrierService);
    expect(service).toBeTruthy();
  });
});
