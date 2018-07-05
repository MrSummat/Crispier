import { TestBed, inject } from '@angular/core/testing';

import { MessageServiceImpl } from './message.service.impl';

describe('MessageServiceImpl', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageServiceImpl]
    });
  });

  it('should be created', inject([MessageServiceImpl], (service: MessageServiceImpl) => {
    expect(service).toBeTruthy();
  }));
});
