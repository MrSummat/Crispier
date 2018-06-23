import { TestBed, inject } from '@angular/core/testing';

import { CoeficientService } from './coeficient.service';

describe('CoeficientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoeficientService]
    });
  });

  it('should be created', inject([CoeficientService], (service: CoeficientService) => {
    expect(service).toBeTruthy();
  }));
});
