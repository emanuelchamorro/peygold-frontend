import { TestBed } from '@angular/core/testing';

import { IibbConditionService } from './iibb-condition.service';

describe('IibbConditionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IibbConditionService = TestBed.get(IibbConditionService);
    expect(service).toBeTruthy();
  });
});
