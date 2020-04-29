import { TestBed } from '@angular/core/testing';

import { PeySettingService } from './pey-setting.service';

describe('PeySettingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeySettingService = TestBed.get(PeySettingService);
    expect(service).toBeTruthy();
  });
});
