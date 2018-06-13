import { TestBed, inject } from '@angular/core/testing';

import { HistoryDeliveryOrderService } from './history-delivery-order.service';

describe('HistoryDeliveryOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoryDeliveryOrderService]
    });
  });

  it('should be created', inject([HistoryDeliveryOrderService], (service: HistoryDeliveryOrderService) => {
    expect(service).toBeTruthy();
  }));
});
