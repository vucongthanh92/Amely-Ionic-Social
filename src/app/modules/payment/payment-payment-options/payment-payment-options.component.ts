import { CustomService } from './../../../services/custom.service';
import { App, NavController } from 'ionic-angular';
import { PaymentConfirmComponent } from './../payment-confirm/payment-confirm.component';
import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-payment-options',
  templateUrl: './payment-payment-options.component.html'
})
export class PaymentPaymentOptionsComponent implements OnInit {

  options: any;
  option_selected: any;
  bankcodes: any;

  constructor(
    private customService: CustomService,
    private appCtrl: App,
    private paymentService: PaymentService
  ) { 
    let bankcodes = this.paymentService.payment_methods.options[this.paymentService.param_create_order.payment];
    if (bankcodes) {
      this.options = bankcodes.bankcode.options;
    }
  }

  ngOnInit() {
  }

  changePage() {
    if (this.options) {
      if (this.option_selected) {
        this.paymentService.param_create_order.bankcode = this.option_selected;
        this.appCtrl.getRootNav().push(PaymentConfirmComponent);
      } else {
        this.customService.toastMessage("Vui lòng chọn phương thức thanh toán", "bottom", 3000);
      }
    } else {
      this.appCtrl.getRootNav().push(PaymentConfirmComponent);
    }
  }
}
