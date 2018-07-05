import { TestBed, inject } from '@angular/core/testing';

import { EvaluatorServiceImpl } from './evaluator.service.impl';

describe('EvaluatorServiceImpl', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvaluatorServiceImpl]
    });
  });

  it('should be created', inject([EvaluatorServiceImpl], (service: EvaluatorServiceImpl) => {
    expect(service).toBeTruthy();
  }));
});
