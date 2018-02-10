import { PaymentService } from './../../../services/payment.service';
import { CustomService } from './../../../services/custom.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { PaymentItemsComponent } from '../../payment/payment-items/payment-items.component';
import { ShoppingsService } from '../../../services/shoppings.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html'
})
export class CartItemsComponent implements OnInit {
  
  items: any;
  number_items = 0;
  total = 0;

  constructor(
    private paymentService: PaymentService,
    private shoppingsService: ShoppingsService,
    private customService: CustomService,
    public nav: NavController, 
    public appCtrl: App) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.items = this.customService.cart; 
    this.update();
  }

  increase(guid) {
    let item = this.items.filter(data => data.guid == guid);
    if (item.length > 0) {
      if (item[0].quantity_cart <= item[0].quantity) {
        item[0].quantity_cart = item[0].quantity_cart + 1;
        this.update();
      }
    }
  }

  decrease(guid) {
    let item = this.items.filter(data => data.guid == guid);
    if (item.length > 0) {
      if (item[0].quantity_cart > 1) {
        item[0].quantity_cart = item[0].quantity_cart - 1;
        this.update();
      }
    }
  }

  remove(guid) {
    this.customService.cart = this.items = this.items.filter(data => data.guid != guid);
    this.update();
  }

  update() {
    this.number_items = 0;
    this.total = 0;
    this.items.forEach(e => {
      this.number_items = this.number_items + e.quantity_cart;
      this.total = this.total + (e.quantity_cart * e.price);
    });
  }

  payment() {
    if (this.items.length > 0) {
      let carts = [];
      this.items.forEach( e => {
        let obj = { guid: e.guid, quantity: e.quantity_cart };
        carts.push(obj);
      });
      this.shoppingsService.putCart({ items: carts }).subscribe( data => {
        this.paymentService.items = data;
        this.appCtrl.getRootNav().push(PaymentItemsComponent);
      });
    }
  }

}
