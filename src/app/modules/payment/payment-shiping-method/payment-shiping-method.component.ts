import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { PaymentReceiverInfoComponent } from '../payment-receiver-info/payment-receiver-info.component';

@Component({
  selector: 'app-payment-shiping-method',
  templateUrl: './payment-shiping-method.component.html'
})
export class PaymentShipingMethodComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) { }

  ngOnInit() {
  }

  changePage() {
    this.appCtrl.getRootNav().push(PaymentReceiverInfoComponent);
  }
}
