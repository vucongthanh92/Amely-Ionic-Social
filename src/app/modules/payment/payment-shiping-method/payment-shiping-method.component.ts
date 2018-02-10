import { CustomService } from './../../../services/custom.service';
import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { PaymentReceiverInfoComponent } from '../payment-receiver-info/payment-receiver-info.component';

@Component({
  selector: 'app-payment-shiping-method',
  templateUrl: './payment-shiping-method.component.html'
})
export class PaymentShipingMethodComponent implements OnInit {

  shipping_methods: any;
  shipping_selected: any;

  constructor(
    private customService: CustomService,
    private paymentService: PaymentService,
    public nav: NavController, 
    public appCtrl: App) { 
      this.shipping_methods = (<any>Object).values(this.paymentService.payment_methods.shipping_methods);
      this.shipping_methods = this.shipping_methods.filter(data => data.filename != "sq/pickup");
    }

  ngOnInit() {
  }

  shipping_method_selected(filename) {
    this.paymentService.param_create_order.shipping_method = filename;
  }

  changePage() {
    if (this.shipping_selected) {
      this.paymentService.param_create_order.shipping_method = this.shipping_selected;
      this.appCtrl.getRootNav().push(PaymentReceiverInfoComponent);
    } else {
      this.customService.toastMessage("Vui lòng chọn phương thức vận chuyển", "bottom", 3000);
    }
  }
}
