import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../../services/transactions.service';
import { Transaction } from '../../../api/models/transaction';

@Component({
  selector: 'app-inventory-history',
  templateUrl: './inventory-history.component.html',
})
export class InventoryHistoryComponent implements OnInit {
  public transactions: Array<Transaction>;
  constructor(private transactionService: TransactionsService) { }

  ngOnInit() {
    this.transactionService.getTransactions('gift').subscribe(data => {
      this.transactions = data;
    })
  }

}
