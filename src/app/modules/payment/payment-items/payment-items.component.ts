import { PaymentService } from './../../../services/payment.service';
import { CustomService } from './../../../services/custom.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { PaymentCustomerInfoComponent } from '../payment-customer-info/payment-customer-info.component';
@Component({
  selector: 'app-payment-items',
  templateUrl: './payment-items.component.html'
})
export class PaymentItemsComponent implements OnInit {

  param: any;
  products: any;
  sub_total: any;
  tax: any;
  total: any;
  currency: any;

  constructor(
    private paymentService: PaymentService,
    private customService: CustomService,
    private navParams: NavParams,
    public nav: NavController, 
    public appCtrl: App) { 
      this.param = this.navParams.get("param");
      this.products = this.param.products;
      this.products = (<any>Object).values(this.products);
      this.sub_total = this.param.sub_total;
      this.tax = this.param.tax;
      this.total = this.param.total;
      this.currency = this.param.currency;
      this.paymentService.getPaymentMethods().subscribe(data => {
        this.paymentService.payment_methods = data;
      });
    }

  ngOnInit() {
  }

  changePage() {
    this.appCtrl.getRootNav().push(PaymentCustomerInfoComponent, { param: this.param });
  }
}
