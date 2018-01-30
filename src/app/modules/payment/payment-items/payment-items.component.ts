import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { PaymentCustomerInfoComponent } from '../payment-customer-info/payment-customer-info.component';
@Component({
  selector: 'app-payment-items',
  templateUrl: './payment-items.component.html'
})
export class PaymentItemsComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) { }

  ngOnInit() {
  }

  changePage() {
    this.appCtrl.getRootNav().push(PaymentCustomerInfoComponent);
  }
}
