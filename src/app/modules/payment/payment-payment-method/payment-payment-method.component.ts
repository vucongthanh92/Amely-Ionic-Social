import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { PaymentOptionsAtmComponent } from '../payment-payment-options/payment-options-atm/payment-options-atm.component';
import { PaymentOptionsPaypalComponent } from '../payment-payment-options/payment-options-paypal/payment-options-paypal.component';
import { PaymentOptionsVisaComponent } from '../payment-payment-options/payment-options-visa/payment-options-visa.component';
import { PaymentOptionsWalletComponent } from '../payment-payment-options/payment-options-wallet/payment-options-wallet.component';

@Component({
  selector: 'app-payment-payment-method',
  templateUrl: './payment-payment-method.component.html'
})
export class PaymentPaymentMethodComponent implements OnInit {

  constructor(
    private paymentService: PaymentService,
    public nav: NavController, 
    public appCtrl: App) {
      console.log(this.paymentService.payment_methods);
      console.log(this.paymentService.param_create_order);
     }

  ngOnInit() {
  }

  changePagePaypal() {
    this.appCtrl.getRootNav().push(PaymentOptionsPaypalComponent);
  }
  changePageWallet() {
    this.appCtrl.getRootNav().push(PaymentOptionsWalletComponent);
  }
  changePageVisa() {
    this.appCtrl.getRootNav().push(PaymentOptionsVisaComponent);
  }
  changePageAtm() {
    this.appCtrl.getRootNav().push(PaymentOptionsAtmComponent);
  }
}
