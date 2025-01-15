import { TestBed } from '@angular/core/testing';

import { ApiRegistryEnteryAccountService } from './api-registry-entery-account.service';

describe('ApiRegistryEnteryAccountService', () => {
  let service: ApiRegistryEnteryAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRegistryEnteryAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
