import { Component, OnInit, ViewChild } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-products-feature',
  templateUrl: './products-feature.component.html'
})

export class ProductsFeatureComponent implements OnInit {

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
