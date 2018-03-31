import { CustomService } from './../../../services/custom.service';
import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
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
    console.log(this.payment_methods);
    this.payment_methods = this.payment_methods.filter(e => e.filename != 'ngl/atm' && e.filename != 'ngl/creditcard')
    // this.payment_methods = this.payment_methods.filter(data => data.filename != "onepay/opatm" && data.filename != "onepay/opcreditcard");
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
