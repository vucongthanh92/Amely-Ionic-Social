import { HistoryOrderDetailComponent } from './../history-order-detail/history-order-detail.component';
import { CustomService } from './../../../services/custom.service';
import { HistoryService } from './../../../services/history.service';
import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../api/models';
import { App, NavController } from 'ionic-angular';

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html'
})
export class HistoryOrderComponent implements OnInit {
  trans: Transaction[];
  constructor(private historyService: HistoryService, public customService: CustomService, private appCtrl: App, private nav: NavController) { }

  ngOnInit() {
    this.loadData(5);
  }

  loadData(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      this.nav.pop();
      return;
    }
    this.historyService.transactionHistory('order').subscribe(data => {
      this.trans = data;
    }, err => this.loadData(--retry))
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
