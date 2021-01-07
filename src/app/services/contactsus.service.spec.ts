import { TestBed } from '@angular/core/testing';

import { ContactsusService } from './contactsus.service';

describe('ContactsusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactsusService = TestBed.get(ContactsusService);
    expect(service).toBeTruthy();
  });
});
