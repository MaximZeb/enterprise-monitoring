import { TestBed } from '@angular/core/testing';

import { ApiDataTechnicsService } from './api-data-technics.service';

describe('ApiDataTechnicsService', () => {
  let service: ApiDataTechnicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDataTechnicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
