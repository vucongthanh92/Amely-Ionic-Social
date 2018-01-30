import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { ProductComponent } from '../../../components/product/product.component';
import { ProductCategoryComponent } from '../../../components/product-category/product-category.component';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html'
})

export class VouchersComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }

  goToPage(value) {
    switch (value) {
      case 'category':
        this.appCtrl.getRootNav().push(ProductCategoryComponent);
        break;
      case 'product':
        this.appCtrl.getRootNav().push(ProductComponent);
        break;
      default:
        break;
    }
  }

}
