import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { WalletsService } from '../../../services/wallets.service';
import { CustomService } from '../../../services/custom.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'app-deposit-payment-option',
  templateUrl: './deposit-payment-option.component.html'
})
export class DepositPaymentOptionComponent implements OnInit {

  options: any;
  option_selected: string;
  paymentMethod: string;
  amount: string;
  constructor(private navParams: NavParams, private nav: NavController,
    private walletService: WalletsService, private customService: CustomService, private iab: InAppBrowser) {
    this.paymentMethod = this.navParams.get('paymentMethod');
    this.amount = this.navParams.get('amount');
  }

  ngOnInit() {
    this.loadData(5)
  }

  loadData(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      this.nav.pop();
      return;
    }
    this.walletService.confirmOptionDeposit(this.paymentMethod, this.amount).subscribe(data => {
      if (data.bankcode) {
        if (data.bankcode.options)
          this.options = data.bankcode.options;
      }
    }, err => this.loadData(--retry))
  }
  changePage() {

    if (this.paymentMethod == 'ngl/atm' || this.paymentMethod == 'ngl/creditcard') {
      if (!this.option_selected) {
        this.customService.toastMessage('Chưa chọn phương thức', 'bottom', 2000);
      } else {
        this.confirmDeposit()
        // this.nav.push(DepositConfirmComponent, { paymentOption: this.option_selected, paymentMethod: this.paymentMethod, amount: this.amount })
      }
    } else {
      // this.nav.push(DepositConfirmComponent, { paymentMethod: this.paymentMethod, amount: this.amount })
      this.confirmDeposit()
    }
  }

  confirmDeposit() {
    console.log(this.amount);
    console.log(this.paymentMethod);
    console.log(this.option_selected);

    this.retryDeposit(5);
  }

  retryDeposit(retry) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.walletService.deposit(this.paymentMethod, this.option_selected, this.amount).subscribe(data => {
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
