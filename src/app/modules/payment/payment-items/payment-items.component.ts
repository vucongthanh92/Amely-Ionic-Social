import { PaymentService } from './../../../services/payment.service';
import { CustomService } from './../../../services/custom.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController, LoadingController } from 'ionic-angular';
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
    public nav: NavController,
    public appCtrl: App,
    public loadingCtrl: LoadingController) {
    this.param = this.paymentService.items;
    this.products = this.param.products;
    this.products = (<any>Object).values(this.products);
    this.sub_total = this.param.sub_total;
    this.tax = this.param.tax;
    this.total = this.param.total;
    this.currency = this.param.currency;
    this.loadData(5);
    console.log(this.products);

  }

  loadData(retry) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();

    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      this.nav.pop();
      return;
    }
    this.paymentService.getPaymentMethods().subscribe(data => {
      loading.dismiss();
      this.paymentService.payment_methods = data;
    }, err => this.loadData(--retry));
  }

  ngOnInit() {
  }

  changePage() {
    this.appCtrl.getRootNav().push(PaymentCustomerInfoComponent);
  }

  formatCurrency(item) {
    return this.customService.formatCurrency(+(item.display_price + (+(item.display_price * (item.tax / 100)))) + "", item.currency);
  }
}
