import { CustomService } from './../../../services/custom.service';
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
  constructor(private transactionService: TransactionsService, private appCtrl: App, private nav: NavController, private customService: CustomService) { }

  ngOnInit() {
    this.loadData(5);
  }

  loadData(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      this.nav.pop();
      return;
    }
    this.transactionService.getTransactions('gift').subscribe(data => {
      this.transactions = data;
    }, err => this.loadData(--retry))
  }
  openHistoryDetail(trans: Transaction) {
    this.appCtrl.getRootNav().push(GiftHistoryComponent, { trans: trans });
  }

  getDateCreate(time: number) {
    return new Date(time * 1000);
  }
}
