import { Component, OnInit } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { PaymentConfirmComponent } from '../../payment-confirm/payment-confirm.component';

@Component({
  selector: 'app-payment-options-visa',
  templateUrl: './payment-options-visa.component.html'
})
export class PaymentOptionsVisaComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) { }

  ngOnInit() {
  }

  changePage() {
    this.appCtrl.getRootNav().push(PaymentConfirmComponent);
  }
}
