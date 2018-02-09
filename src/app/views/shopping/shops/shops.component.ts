import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { CartItemsComponent } from '../../../modules/cart/cart-items/cart-items.component';


@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
})
export class ShopsComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) { }

  ngOnInit() {
  }

  

}
