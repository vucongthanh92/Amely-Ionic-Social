import { CustomService } from './../../../services/custom.service';
import { HistoryOfferDetailComponent } from './../history-offer-detail/history-offer-detail.component';
import { HistoryService } from './../../../services/history.service';
import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../api/models';
import { App, NavController } from 'ionic-angular';

@Component({
  selector: 'app-history-offer',
  templateUrl: './history-offer.component.html'
})
export class HistoryOfferComponent implements OnInit {
  trans: Transaction[];
  constructor(private historyService: HistoryService, private appCtrl: App, private customService: CustomService, private nav: NavController) { }

  ngOnInit() {
    this.loadData(5)
  }

  loadData(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      this.nav.pop();
      return;
    }
    this.historyService.transactionHistory('offer').subscribe(data => {
      this.trans = data;
    }, err => this.loadData(--retry))
  }

  openHistoryDetail(transaction: Transaction) {
    this.appCtrl.getRootNav().push(HistoryOfferDetailComponent, { transaction: transaction })
  }

  getDateCreate(time: number) {
    return new Date(time * 1000);
  }
}
