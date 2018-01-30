import { Component, OnInit } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { PaymentPaymentMethodComponent } from '../payment-payment-method/payment-payment-method.component';

@Component({
  selector: 'app-payment-receiver-info',
  templateUrl: './payment-receiver-info.component.html'
})
export class PaymentReceiverInfoComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) { }

  ngOnInit() {
  }

  changePage() {
    this.appCtrl.getRootNav().push(PaymentPaymentMethodComponent);
  }
}
