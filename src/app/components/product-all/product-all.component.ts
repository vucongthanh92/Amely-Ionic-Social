import { Component, OnInit } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html'
})
export class ProductAllComponent {

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }

  goToPage(value) {
    switch (value) {
      case 'product':
        this.appCtrl.getRootNav().push(ProductComponent);
        break;
      default:
        break;
    }
  }
}
