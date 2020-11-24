import { TestBed } from '@angular/core/testing';

import { ListTitleResolverService } from './list-title-resolver.service';

describe('ListTitleResolverService', () => {
  let service: ListTitleResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListTitleResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
