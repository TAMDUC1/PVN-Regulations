import { TestBed } from '@angular/core/testing';

import { ListDataResolverService } from './list-data-resolver.service';

describe('ListDataResolverService', () => {
  let service: ListDataResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListDataResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
