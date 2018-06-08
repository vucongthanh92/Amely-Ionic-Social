import { PaymentWebviewComponent } from './../payment-webview/payment-webview.component';
import { CustomService } from './../../../services/custom.service';
import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import { PROVINCES } from './../../../provinces';
import { WARDS } from './../../../wards';
import { DISTRICTS } from './../../../districts';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NavController, LoadingController } from 'ionic-angular';
import { Product } from '../../../api/models';

@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html'
})
export class PaymentConfirmComponent implements OnInit {

  confirm: any;
  customer_address: any;
  reciver_address: any;
  items: any;
  provinces: any;
  payment_method: any;
  shipping_method: any;
  private loading;
  is_show_shipping_method: boolean;
  constructor(
    private nav: NavController,
    private iab: InAppBrowser,
    private customService: CustomService,
    private paymentService: PaymentService,
    private loadingCtrl: LoadingController
  ) {
    this.confirm = this.paymentService.param_create_order;
    this.items = this.paymentService.items;
    this.payment_method = this.paymentService.payment_methods.payment_methods[this.paymentService.param_create_order.payment].displayname;
    this.shipping_method = this.paymentService.payment_methods.shipping_methods[this.paymentService.param_create_order.shipping_method].displayname;
    console.log(this.paymentService.items);
    
    this.is_show_shipping_method = this.paymentService.payment_methods.shipping_methods[this.paymentService.param_create_order.shipping_method].filename != 'sq/storage';
    if (this.paymentService.param_create_order.shipping_method != 'sq/express') this.paymentService.param_create_order.shipping_fee = "0";

    if (this.confirm.province && this.confirm.district && this.confirm.ward) {
      this.customer_address = this.confirm.address + " " + this.getDisplayname(this.confirm.ward, 'ward') + " " + this.getDisplayname(this.confirm.district, 'district') + " " + this.getDisplayname(this.confirm.province, 'province');
    } else {
      this.customer_address = this.confirm.address;
    }

    if (this.confirm.shipping_province && this.confirm.shipping_district && this.confirm.shipping_ward) {
      this.reciver_address = this.confirm.shipping_address + " " + this.getDisplayname(this.confirm.shipping_ward, 'ward') + " " + this.getDisplayname(this.confirm.shipping_district, 'district') + " " + this.getDisplayname(this.confirm.shipping_province, 'province');
    } else {
      this.reciver_address = this.confirm.shipping_address;
    }
  }

  formatTotalPrice() {
    return this.customService.formatCurrency(((+this.items.total) + (+this.paymentService.param_create_order.shipping_fee)) + "", this.items.currency)
  }

  getDisplayname(id, type) {
    switch (type) {
      case 'province':
        let province = PROVINCES.filter(data => data.provinceid == id);
        return province[0].type + " " + province[0].name;
      case 'district':
        let district = DISTRICTS.filter(data => data.districtid == id);
        return district[0].type + " " + district[0].name;
      case 'ward':
        let ward = WARDS.filter(data => data.wardid == id);
        return ward[0].type + " " + ward[0].name;
      default:
        break;
    }
  }

  ngOnInit() {
  }

  changePage() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.retryCreateOrder(5, this.loading);
    console.log(this.paymentService.param_create_order);

  }

  retryCreateOrder(retry, loading) {
    if (retry == 0) {
      this.loading.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.paymentService.createOrder().subscribe(data => {
      console.log(data);
      this.loading.dismiss();
      this.nav.push(PaymentWebviewComponent, { url: data.url });
      const browser = this.iab.create(data.url, '_blank', { location: 'no', zoom: 'yes' });
      browser.on('loadstop').subscribe(e => {
        if (e.url.indexOf('https://amely.com/m/temp_order/') > -1) {
          setTimeout(() => {
            this.paymentService.items = false;
            this.customService.cart = [];
            this.nav.popToRoot();
            console.log('loadstop');
            browser.close();
          }, 3000);
        }

      });
      browser.on('exit').subscribe(data => {
        this.paymentService.items = false;
        this.customService.cart = [];
        this.nav.popToRoot();
        console.log('exit');
      });

      browser.on('loadstart').subscribe(e => {

      });
    }, err => { this.retryCreateOrder(--retry, loading) })
  }
  formatCurrency(item: Product) {
    return this.customService.formatCurrency(this.customService.netPrice(item) + "", item.display_currency);
  }

  dismiss() {
    this.nav.pop();
  }

}
