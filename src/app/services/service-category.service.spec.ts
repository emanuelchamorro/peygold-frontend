import { TestBed } from '@angular/core/testing';

import { ServiceCategoryService } from './service-category.service';

describe('ServiceCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceCategoryService = TestBed.get(ServiceCategoryService);
    expect(service).toBeTruthy();
  });
});
