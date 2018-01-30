import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { PaymentItemsComponent } from '../../payment/payment-items/payment-items.component';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html'
})
export class CartItemsComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) { }

  ngOnInit() {
  }

  changePage() {
    this.appCtrl.getRootNav().push(PaymentItemsComponent);
  }
}
