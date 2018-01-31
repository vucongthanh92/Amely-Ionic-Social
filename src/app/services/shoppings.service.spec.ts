import { TestBed, inject } from '@angular/core/testing';

import { ShoppingsService } from './shoppings.service';

describe('ShoppingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingsService]
    });
  });

  it('should be created', inject([ShoppingsService], (service: ShoppingsService) => {
    expect(service).toBeTruthy();
  }));
});
