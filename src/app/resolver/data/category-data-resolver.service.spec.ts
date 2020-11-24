import { TestBed } from '@angular/core/testing';

import { CategoryDataResolverService } from './category-data-resolver.service';

describe('CategoryDataResolverService', () => {
  let service: CategoryDataResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryDataResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
