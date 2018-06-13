import { TestBed, inject } from '@angular/core/testing';

import { EvaluatorService } from './evaluator.service';

describe('EvaluatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvaluatorService]
    });
  });

  it('should be created', inject([EvaluatorService], (service: EvaluatorService) => {
    expect(service).toBeTruthy();
  }));
});
