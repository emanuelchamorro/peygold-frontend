import { TestBed } from '@angular/core/testing';

import { InsuranceCarriersService } from './insurance-carriers.service';

describe('InsuranceCarriersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsuranceCarriersService = TestBed.get(InsuranceCarriersService);
    expect(service).toBeTruthy();
  });
});
