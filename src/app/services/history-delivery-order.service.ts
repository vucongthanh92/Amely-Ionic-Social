import { Injectable } from '@angular/core';
import { ApiService } from '../api/services';

@Injectable()
export class HistoryDeliveryOrderService {

  constructor(private apiService: ApiService) { }

  historyDeliveryOrder(doGuid: number) {
    return this.apiService.getDO(doGuid);
  }
}
