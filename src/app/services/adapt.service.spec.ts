import { TestBed } from '@angular/core/testing';

import { AdaptService } from './adapt.service';

describe('AdaptService', () => {
  let service: AdaptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdaptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
