import { TestBed, inject } from '@angular/core/testing';

import { ContributionServiceImpl } from './contribution.service.impl';

describe('ContributionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContributionServiceImpl]
    });
  });

  it('should be created', inject([ContributionServiceImpl], (service: ContributionServiceImpl) => {
    expect(service).toBeTruthy();
  }));
});
