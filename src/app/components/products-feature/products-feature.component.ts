import { Component, OnInit, ViewChild } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { ProductComponent } from '../product/product.component';
import { ProductAllComponent } from '../product-all/product-all.component';
import { ShoppingsService } from '../../services/shoppings.service';
import { Product } from '../../api/models/product';

@Component({
  selector: 'app-products-feature',
  templateUrl: './products-feature.component.html'
})

export class ProductsFeatureComponent implements OnInit {
  public productsMostSold: Array<Product> = [];
  constructor(public nav: NavController, public appCtrl: App, private shoppingSerivce: ShoppingsService) { }

  ngOnInit() {
    this.shoppingSerivce.getMostSoldProducts().subscribe(data => {
      if (data instanceof Array) {
        this.productsMostSold = data;
      }
    })
  }

  goToPage(value, product: Product) {
    switch (value) {
      case 'all':
        this.appCtrl.getRootNav().push(ProductAllComponent);
        break;
      case 'product':
        this.appCtrl.getRootNav().push(ProductComponent, { guid: product.guid });
        break;
      default:
        break;
    }
  }

}
