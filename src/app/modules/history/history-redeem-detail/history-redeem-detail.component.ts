import { NavParams, NavController, LoadingController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Transaction, RedeemHistoryDetail } from '../../../api/models';
import { HistoryService } from '../../../services/history.service';
import { CustomService } from '../../../services/custom.service';

@Component({
  selector: 'app-history-redeem-detail',
  templateUrl: './history-redeem-detail.component.html'
})
export class HistoryRedeemDetailComponent implements OnInit {
  transaction: Transaction;
  detail: RedeemHistoryDetail;
  constructor(private navParams: NavParams, private historyService: HistoryService, private nav: NavController, private customService: CustomService, private loadingCtrl: LoadingController) {
    this.transaction = this.navParams.get("transaction");
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });

    loading.present();
    this.retryData(5, loading);
  }

  retryData(retry: number, loading) {
    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.historyService.getRedeemDetail(this.transaction.related_guid + "", this.transaction.seller, this.transaction.quantity + "", this.transaction.owner_guid + "").subscribe(data => {
      if (data && data.owner && data.shop && data.snapshot) {
        this.detail = data;
      } else {
        this.nav.pop();
        this.customService.toastMessage("Không tải được chi tiết sử dụng.Vui lòng thử lại", "bottom", 3000);
      }
      loading.dismiss();
    }, err => this.retryData(--retry, loading));
  }
  dismiss(){
    this.nav.pop();
  }
}
