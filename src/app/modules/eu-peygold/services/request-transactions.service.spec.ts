import { TestBed } from '@angular/core/testing';

import { RequestTransactionsService } from './request-transactions.service';

describe('RequestTransactionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestTransactionsService = TestBed.get(RequestTransactionsService);
    expect(service).toBeTruthy();
  });
});
