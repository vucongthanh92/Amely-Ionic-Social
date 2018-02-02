import { Injectable } from '@angular/core';
import { ApiService } from '../api/services/api.service';

@Injectable()
export class TransactionsService {

  constructor(private apiService: ApiService) { }

  getTransactions(transaction_type: string) {
    return this.apiService.getTransactions(transaction_type);
  }
}
