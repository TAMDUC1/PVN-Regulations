import { TestBed } from '@angular/core/testing';

import { MenuTitleResolverService } from './menu-title-resolver.service';

describe('MenuTitleResolverService', () => {
  let service: MenuTitleResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuTitleResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
