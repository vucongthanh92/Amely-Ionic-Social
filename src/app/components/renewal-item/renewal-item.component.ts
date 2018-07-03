import { NavController } from 'ionic-angular/navigation/nav-controller';
import { Wallet } from './../../api/models/wallet';
import { InventoriesService } from './../../services/inventories.service';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Component, OnInit } from '@angular/core';
import { Item } from '../../api/models';
import { CustomService } from '../../services/custom.service';
import { AlertController, LoadingController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
  public inviable: boolean = false;
  public paymentMethodSelected: string;
  public paymentMethods: any;
  constructor(private navParams: NavParams, private inventoriesService: InventoriesService, private customService: CustomService, private nav: NavController,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController, private iab: InAppBrowser) {
    this.item = this.navParams.get('item');
    this.callback = this.navParams.get('callback');
    this.total_price = this.customService.formatCurrency("0", this.item.currency);
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });

    loading.present();
    this.retryGetWallet(10, loading);

  }

  retryGetWallet(retry, loading) {
    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.inventoriesService.getWallet().subscribe(data => {
      this.wallet = data;
    }, err => this.retryGetWallet(--retry, loading))

    this.inventoriesService.getPaymentMethods().subscribe(data => {
      loading.dismiss();
      this.paymentMethods = (<any>Object).values(data.payment_methods);
    }, err => this.retryGetWallet(--retry, loading))

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
            } else if (!this.paymentMethodSelected)
              this.customService.toastMessage('Chưa chọn phương thức thanh toán', 'bottom', 3000)
            else this.retryRenewalItem(5);
          }
        }
      ]
    });
    alert.present();
  }

  retryRenewalItem(retry) {
    if (retry == 0)
      return;
    this.inventoriesService.renewalItem(this.item.guid, this.number_day, this.paymentMethodSelected).subscribe(data => {
      // if (!data.status && data.error == "balance_enough") {
      //   this.customService.toastMessage("Số tiền trong ví không đủ", "bottom", 2000);
      // } else if (data.status) {
      //   this.customService.toastMessage("Gia hạn thành công", "bottom", 2000);
      //   this.callback(this.number_day).then(() => {
      //     this.nav.pop();
      //   });
      // } else {
      //   this.customService.toastMessage("Gia hạn thất bại", "bottom", 2000);
      // }
      if (data.url) {
        this.openBrowser(data.url);
      } else {
        this.customService.toastMessage("Gia hạn thất bại", "bottom", 2000);
      }

    }, err => this.retryRenewalItem(--retry));
  }

  openBrowser(url) {
    const browser = this.iab.create(url, '_blank', { location: 'no', zoom: 'yes' });
    browser.on('loadstop').subscribe(e => {
      if (e.url.indexOf('https://amely.com/m/temp_order/') > -1) {
        setTimeout(() => {
          this.nav.popToRoot();
          browser.close();
        }, 3000);
      }

    });
    browser.on('exit').subscribe(data => {
      this.nav.popToRoot();
    });

    browser.on('loadstart').subscribe(e => {

    });
  }
}
