import { Component, OnInit } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { PaymentShipingMethodComponent } from '../payment-shiping-method/payment-shiping-method.component';


@Component({
  selector: 'app-payment-customer-info',
  templateUrl: './payment-customer-info.component.html'
})
export class PaymentCustomerInfoComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) { }

  ngOnInit() {
  }


  changePage() {
    this.appCtrl.getRootNav().push(PaymentShipingMethodComponent);
  }
}
