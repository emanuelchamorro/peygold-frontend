import { TestBed } from '@angular/core/testing';

import { IvaConditionService } from './iva-condition.service';

describe('IvaConditionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IvaConditionService = TestBed.get(IvaConditionService);
    expect(service).toBeTruthy();
  });
});
