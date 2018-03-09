import { GiftHistoryComponent } from './../../../components/gift/gift-history/gift-history.component';
import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../../services/transactions.service';
import { Transaction } from '../../../api/models/transaction';
import { App, NavController } from 'ionic-angular';

@Component({
  selector: 'app-inventory-history',
  templateUrl: './inventory-history.component.html',
})
export class InventoryHistoryComponent implements OnInit {
  public transactions: Array<Transaction>;
  constructor(private transactionService: TransactionsService, private appCtrl: App, private nav: NavController) { }

  ngOnInit() {
    this.transactionService.getTransactions('gift').subscribe(data => {
      this.transactions = data;
      console.log(data);
      
    })
  }

  openHistoryDetail(trans: Transaction) {
    this.appCtrl.getRootNav().push(GiftHistoryComponent, { trans: trans });
  }

  getDateCreate(time: number) {
    return new Date(time * 1000);
  }
}
