import { PaymentService } from './../../../services/payment.service';
import { CustomService } from './../../../services/custom.service';
import { QuickPayShippingOptionComponent } from './../quick-pay-shipping-option/quick-pay-shipping-option.component';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuickPayConfirmComponent } from '../quick-pay-confirm/quick-pay-confirm.component';

@Component({
  selector: 'app-quick-pay-shipping-method',
  templateUrl: './quick-pay-shipping-method.component.html'
})
export class QuickPayShippingMethodComponent implements OnInit {
  public shipping_methods: Array<any>;
  constructor(private nav: NavController, private customService: CustomService, private paymentService: PaymentService) { }

  ngOnInit() {
    this.shipping_methods = (<any>Object).values(this.paymentService.payment_order_post.shipping_methods);
  }

  confirmBill(method) {
    this.paymentService.quick_pay_send_data.shipping_methods = method;
    if (method.filename != 'sq/storage' && method.filename != 'sq/pickup') {
      this.nav.push(QuickPayShippingOptionComponent);
    } else this.nav.push(QuickPayConfirmComponent);
  }

}
