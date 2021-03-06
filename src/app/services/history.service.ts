import { Injectable } from '@angular/core';
import { ApiService } from '../api/services';

@Injectable()
export class HistoryService {

  constructor(private apiService: ApiService) { }

  deliveryHistory() {
    return this.apiService.getDOs();
  }

  transactionHistory(type: string) {
    return this.apiService.getTransactions(type);
  }

  getOrder(guid) {
    return this.apiService.getOrder(guid);
  }

  getRedeemDetail(snapshotGuid: string, sellerGuid: string, quantity: string, ownerGuid: string) {
    return this.apiService.getTransactionRedeem({
      snapshotGuid: snapshotGuid, sellerGuid: sellerGuid, quantity: quantity, ownerGuid: ownerGuid
    })
  }
}
