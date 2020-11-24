import { TestBed } from '@angular/core/testing';

import { DocumentDataResolverService } from './document-data-resolver.service';

describe('DocumentDataResolverService', () => {
  let service: DocumentDataResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentDataResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
