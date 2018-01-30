import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { ProductComponent } from '../product/product.component';
import { ProductAllComponent } from '../product-all/product-all.component';

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
      case 'all':
        this.appCtrl.getRootNav().push(ProductAllComponent);
        break;
      case 'product':
        this.appCtrl.getRootNav().push(ProductComponent);
        break;
      default:
        break;
    }
  }

}
