import { Wallet } from './../../../api/models/wallet';
import { DepositPaymentOptionComponent } from './../deposit-payment-option/deposit-payment-option.component';
import { WalletsService } from './../../../services/wallets.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { CustomService } from '../../../services/custom.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'app-deposit-payment-method',
  templateUrl: './deposit-payment-method.component.html'
})
export class DepositPaymentMethodComponent implements OnInit {
  payment_methods = [];
  payment_selected: any;
  private limit: any;
  amount: string;
  private min: number;
  private max: number;
  wallet: Wallet;

  constructor(private navParams: NavParams, private nav: NavController, private walletService: WalletsService, private customService: CustomService, private iab: InAppBrowser) {
    this.wallet = this.navParams.get('wallet')
  }

  ngOnInit() {
    this.loadData(5);
  }

  loadData(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.walletService.confirmDeposit().subscribe(data => {
      this.payment_methods = (<any>Object).values(data.payment_method);
      this.limit = data.limit;
      console.log(this.payment_methods);
      this.payment_methods = this.payment_methods.filter(e => e.filename != 'ngl/atm' && e.filename != 'ngl/creditcard')

    }, err => this.loadData(--retry))
  }

  changePage() {
    if (!this.payment_selected) {
      this.customService.toastMessage('Chưa chọn phương thức thanh toán', 'bottom', 2000)
    } else if (!this.amount) {
      this.customService.toastMessage('Số tiền rút không hợp lệ', 'bottom', 2000)
    } else {
      if (+this.amount < this.min || +this.amount > this.max) {
        this.customService.toastMessage('Số tiền rút không hợp lệ', 'bottom', 2000)
      } else {
        // this.nav.push(DepositPaymentOptionComponent, { paymentMethod: this.payment_selected, amount: +this.amount })
        this.retryDeposit(5);
      }
    }
  }

  showLimitAmount(isMin: boolean) {
    if (this.limit)
      switch (this.wallet.currency) {
        case 'USD':
          this.min = this.limit.min.USD;
          this.max = this.limit.max.USD;
          if (isMin) return this.customService.formatCurrency(this.min + '', 'USD');
          else return this.customService.formatCurrency(this.max + '', 'USD');
        default:
          this.min = this.limit.min.VND;
          this.max = this.limit.max.VND;
          if (isMin) return this.customService.formatCurrency(this.min + '', 'VND');
          else return this.customService.formatCurrency(this.max + '', 'VND');
      }
  }

  dismiss() {
    this.nav.pop();
  }

  retryDeposit(retry) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.walletService.deposit(this.payment_selected, null, +this.amount).subscribe(data => {
      console.log(data);

      const browser = this.iab.create(data.url);
      browser.on('loadstop').subscribe(data => {
        this.nav.popToRoot();
      });
      browser.on('exit').subscribe(data => {
        this.nav.popToRoot();
      });
    }, err => this.retryDeposit(--retry));
  }
}
