import { NavController,  LoadingController } from 'ionic-angular';
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

  constructor(private nav: NavController, private customService: CustomService, private loadingCtrl: LoadingController) {

  }

  ngOnInit() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();
    this.loadData(5, loading);
  }

  loadData(retry: number, loading) {
    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.customService.getTransactions('redeem').subscribe(data => {
      loading.dismiss();
      if (data instanceof Array) {
        this.transactions = data;
      } else this.transactions = [];
    }, err => this.loadData(--retry, loading))
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
