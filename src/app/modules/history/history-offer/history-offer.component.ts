import { HistoryOfferDetailComponent } from './../history-offer-detail/history-offer-detail.component';
import { HistoryService } from './../../../services/history.service';
import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../api/models';
import { App } from 'ionic-angular';

@Component({
  selector: 'app-history-offer',
  templateUrl: './history-offer.component.html'
})
export class HistoryOfferComponent implements OnInit {
  trans: Transaction[];
  constructor(private historyService: HistoryService, private appCtrl: App) { }

  ngOnInit() {
    this.historyService.transactionHistory('offer').subscribe(data => {
      this.trans = data;
    })
  }
  openHistoryDetail(transaction: Transaction) {
    this.appCtrl.getRootNav().push(HistoryOfferDetailComponent, { transaction: transaction })
  }

  getDateCreate(time: number) {
    return new Date(time * 1000);
  }
}
