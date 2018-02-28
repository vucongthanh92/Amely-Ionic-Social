import { Category } from './../../../api/models/category';
import { Product } from './../../../api/models/product';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { ProductComponent } from '../../../components/product/product.component';
import { ProductCategoryComponent } from '../../../components/product-category/product-category.component';
import { ShoppingsService } from '../../../services/shoppings.service';
import { CustomService } from '../../../services/custom.service';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html'
})

export class VouchersComponent implements OnInit {
  public vouchers: Array<Product> = [];
  public categories: Array<Category>;
  public offset: number = 0;
  public limit: number = 20;
  constructor(public nav: NavController, public appCtrl: App, private shoppingsService: ShoppingsService, public customService: CustomService) { }

  ngOnInit() {
    this.shoppingsService.getVouchers(this.offset, this.limit).subscribe(data => {
      this.vouchers = data;
    });
    this.shoppingsService.getCategories(0, 9999, null, 2, 0).subscribe(data => {
      this.categories = data;
    })
  }

  goToPage(value, voucher: Product,category:Category) {
    switch (value) {
      case 'category':
          this.appCtrl.getRootNav().push(ProductCategoryComponent, { guid: category.guid, arr: this.categories, title: category.title });
        break;
      case 'product':
        this.appCtrl.getRootNav().push(ProductComponent, { guid: voucher.guid });
        break;
      default:
        break;
    }
  }

}
