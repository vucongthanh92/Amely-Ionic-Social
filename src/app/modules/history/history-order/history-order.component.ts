import { HistoryOrderDetailComponent } from './../history-order-detail/history-order-detail.component';
import { CustomService } from './../../../services/custom.service';
import { HistoryService } from './../../../services/history.service';
import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../api/models';
import { App } from 'ionic-angular';

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html'
})
export class HistoryOrderComponent implements OnInit {
  trans: Transaction[];
  constructor(private historyService: HistoryService, public customService: CustomService, private appCtrl: App) { }

  ngOnInit() {
    this.historyService.transactionHistory('order').subscribe(data => {
      this.trans = data;
    })
  }

  openHistoryDetail(transaction: Transaction) {
    this.appCtrl.getRootNav().push(HistoryOrderDetailComponent, { transaction: transaction })
  }

  getDateCreate(time) {
    return new Date(time * 1000);
  }

  formatCurrency(price, currency) {
    return this.customService.formatCurrency(price, currency);
  }
}
