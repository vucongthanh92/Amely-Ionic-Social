import { NavController } from 'ionic-angular/navigation/nav-controller';
import { Wallet } from './../../api/models/wallet';
import { InventoriesService } from './../../services/inventories.service';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Component, OnInit } from '@angular/core';
import { Item } from '../../api/models';
import { CustomService } from '../../services/custom.service';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'app-renewal-item',
  templateUrl: './renewal-item.component.html'
})
export class RenewalItemComponent implements OnInit {
  public item: Item;
  public wallet: Wallet;
  public number_day: number;
  public total_price: string;
  private callback: any;
  constructor(private navParams: NavParams, private inventoriesService: InventoriesService, private customService: CustomService, private nav: NavController,
    private alertCtrl: AlertController) {
    this.item = this.navParams.get('item');
    this.callback = this.navParams.get('callback');
    this.total_price = this.customService.formatCurrency("0", this.item.currency);
  }

  ngOnInit() {
    this.retryGetWallet(5);
  }

  retryGetWallet(retry) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.inventoriesService.getWallet().subscribe(data => {
      this.wallet = data;
    }, err => this.retryGetWallet(--retry))
  }
  formatCurrencyWallet(w: Wallet) {
    return this.customService.formatCurrency(w.balance, w.currency);
  }

  formatCurrency(amount: string, currency: string) {
    return this.customService.formatCurrency(amount, currency);
  }

  onChangeTime(value) {
    if (!this.customService.isInteger(this.number_day + "")) {
      this.customService.toastMessage('Số ngày không hợp lệ', 'bottom', 3000)
    } else
      this.total_price = this.customService.formatCurrency((+this.number_day * this.item.adjourn_price) + "", this.item.currency);
  }

  onRenewal() {
    let alert = this.alertCtrl.create({
      title: 'Xác nhận',
      message: 'Gia hạn sản phẩm',
      buttons: [
        {
          text: 'Từ chối'
        },
        {
          text: 'Chấp nhận',
          handler: () => {
            if (!this.customService.isInteger(this.number_day + "")) {
              this.customService.toastMessage('Số ngày không hợp lệ', 'bottom', 3000)
            } else this.retryRenewalItem(5);
          }
        }
      ]
    });
    alert.present();
  }

  retryRenewalItem(retry) {
    if (retry == 0)
      return;

    this.inventoriesService.renewalItem(this.item.guid, this.number_day).subscribe(data => {
      if (!data.status && data.error == "balance_enough") {
        this.customService.toastMessage("Số tiền trong ví không đủ", "bottom", 2000);
      } else if (data.status) {
        this.customService.toastMessage("Gia hạn thành công", "bottom", 2000);
        this.callback(this.number_day).then(() => {
          this.nav.pop();
        });
      } else {
        this.customService.toastMessage("Gia hạn thất bại", "bottom", 2000);
      }
    }, err => this.retryRenewalItem(--retry));
  }
}
