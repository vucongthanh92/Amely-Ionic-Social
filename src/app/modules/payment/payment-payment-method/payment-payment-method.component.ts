import { CustomService } from './../../../services/custom.service';
import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { PaymentOptionsAtmComponent } from '../payment-payment-options/payment-options-atm/payment-options-atm.component';
import { PaymentOptionsPaypalComponent } from '../payment-payment-options/payment-options-paypal/payment-options-paypal.component';
import { PaymentOptionsVisaComponent } from '../payment-payment-options/payment-options-visa/payment-options-visa.component';
import { PaymentOptionsWalletComponent } from '../payment-payment-options/payment-options-wallet/payment-options-wallet.component';
import { PaymentPaymentOptionsComponent } from '../payment-payment-options/payment-payment-options.component';

@Component({
  selector: 'app-payment-payment-method',
  templateUrl: './payment-payment-method.component.html'
})
export class PaymentPaymentMethodComponent implements OnInit {

  payment_methods: any;
  payment_selected: any;

  constructor(
    private customService: CustomService,
    private paymentService: PaymentService,
    public nav: NavController, 
    public appCtrl: App) {
    this.payment_methods = (<any>Object).values(this.paymentService.payment_methods.payment_methods );
    this.payment_methods = this.payment_methods.filter(data => data.filename != "onepay/opatm" && data.filename != "onepay/opcreditcard");
    }

  ngOnInit() {
  }

  changePage() {
    if (typeof this.payment_selected == "undefined" || this.payment_selected == "") {
      this.customService.toastMessage("Vui lòng chọn phương thức thanh toán", "bottom", 3000);
    } else {
      this.paymentService.param_create_order.payment = this.payment_selected;
      this.appCtrl.getRootNav().push(PaymentPaymentOptionsComponent);
    }
  }
}
