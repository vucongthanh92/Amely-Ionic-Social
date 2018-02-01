import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { PaymentConfirmComponent } from '../../payment-confirm/payment-confirm.component';

@Component({
  selector: 'app-payment-options-atm',
  templateUrl: './payment-options-atm.component.html'
})
export class PaymentOptionsAtmComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) { }

  ngOnInit() {
  }

  changePage() {
    this.appCtrl.getRootNav().push(PaymentConfirmComponent);
  }
}
