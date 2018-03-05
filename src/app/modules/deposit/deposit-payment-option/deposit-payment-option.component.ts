import { Options } from './../../../api/models/options';
import { DepositConfirmComponent } from './../deposit-confirm/deposit-confirm.component';
import { Component, OnInit } from '@angular/core';
import { NavParams, App, NavController } from 'ionic-angular';
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
  constructor(private navParams: NavParams, private appCtrl: App, private nav: NavController,
    private walletService: WalletsService, private customService: CustomService, private iab: InAppBrowser) {
    this.paymentMethod = this.navParams.get('paymentMethod');
    this.amount = this.navParams.get('amount');
  }

  ngOnInit() {
    this.walletService.confirmOptionDeposit(this.paymentMethod, this.amount).subscribe(data => {
      console.log(data);
      if (data.bankcode) {
        if (data.bankcode.options)
          this.options = data.bankcode.options;
      }
    })
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

    this.walletService.deposit(this.paymentMethod, this.option_selected, this.amount).subscribe(data => {
      console.log(data);
      
      const browser = this.iab.create(data.url);
      browser.on('loadstop').subscribe(data => {
        this.nav.popToRoot();
      });
      browser.on('exit').subscribe(data => {
        this.nav.popToRoot();
      });
    })
  }
}
