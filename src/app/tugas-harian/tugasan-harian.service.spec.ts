import { TestBed } from '@angular/core/testing';

import { TugasanHarianService } from './tugasan-harian.service';

describe('TugasanHarianService', () => {
  let service: TugasanHarianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TugasanHarianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
