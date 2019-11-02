import { TestBed } from '@angular/core/testing';

import { LogoutAuthService } from './logout-auth.service';

describe('LogoutAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogoutAuthService = TestBed.get(LogoutAuthService);
    expect(service).toBeTruthy();
  });
});
