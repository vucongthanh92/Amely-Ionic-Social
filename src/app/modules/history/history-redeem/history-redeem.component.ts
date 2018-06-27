import { NavController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { CustomService } from '../../../services/custom.service';
import { Transaction } from '../../../api/models';
import { HistoryRedeemDetailComponent } from '../history-redeem-detail/history-redeem-detail.component';

@Component({
  selector: 'app-history-redeem',
  templateUrl: './history-redeem.component.html'
})
export class HistoryRedeemComponent implements OnInit {

  transactions: Array<Transaction>;
 
  constructor(private nav: NavController, private customService: CustomService) { 
   
  }

  ngOnInit() {
    this.customService.getTransactions('redeem').subscribe(data => {
      if (data instanceof Array) {
        this.transactions = data;
      } else this.transactions = [];
    })
  }

  dismiss() {
    this.nav.pop();
  }

  convertDate(time) {
    return new Date(time * 1000);
  }
  openDetail(trans: Transaction) {
    this.nav.push(HistoryRedeemDetailComponent, { transaction: trans })
  }
}
