import { MainMenuComponent } from './../../../layout/main-menu/main-menu.component';
import { InventoriesComponent } from './../../../views/inventories/inventories.component';
import { CustomService } from './../../../services/custom.service';
import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import { PROVINCES } from './../../../provinces';
import { WARDS } from './../../../wards';
import { DISTRICTS } from './../../../districts';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Platform, NavController, App } from 'ionic-angular';

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

  constructor(
    private appCtrl: App,
    private nav: NavController,
    private platform: Platform,
    private iab: InAppBrowser,
    private customService: CustomService,
    private paymentService: PaymentService
  ) { 
    
    this.confirm = this.paymentService.param_create_order;
    this.items = this.paymentService.items;
    this.payment_method = this.paymentService.payment_methods.payment_methods[this.paymentService.param_create_order.payment].displayname;
    this.shipping_method = this.paymentService.payment_methods.shipping_methods[this.paymentService.param_create_order.shipping_method].displayname;
    
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
    this.paymentService.createOrder().subscribe(data => {
        const browser = this.iab.create(data.url);
        browser.on('exit').subscribe(data => {
          this.paymentService.items = false;
          this.customService.cart = [];
          this.nav.popToRoot();
        });
    })
  }

}
