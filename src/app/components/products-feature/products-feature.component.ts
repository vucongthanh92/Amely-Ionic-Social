import { ProductCategoryComponent } from './../product-category/product-category.component';
import { Component, OnInit, Input } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { ProductComponent } from '../product/product.component';
import { ProductAllComponent } from '../product-all/product-all.component';
import { ShoppingsService } from '../../services/shoppings.service';
import { Product } from '../../api/models/product';
import { CustomService } from '../../services/custom.service';

@Component({
  selector: 'app-products-feature',
  templateUrl: './products-feature.component.html'
})

export class ProductsFeatureComponent implements OnInit {
  public productsMostSold: Array<Product> = [];
  @Input('shopGuid') shopGuid;
  constructor(public nav: NavController, public appCtrl: App, private shoppingSerivce: ShoppingsService, private customSerice: CustomService) { }

  ngOnInit() {
    if (this.shopGuid != undefined) {
      this.initShopProductFeatue();
    } else {
      this.shoppingSerivce.getMostSoldProducts().subscribe(data => {
        if (data instanceof Array) {
          this.productsMostSold = data;
        }
      })
    }
  }

  initShopProductFeatue() {
    // "default" "feature"
    this.shoppingSerivce.getProducts(null, this.shopGuid, "feature", null, 0, 0, 10).subscribe(data => {
      if (data.products instanceof Array) {
        this.productsMostSold = data.products;
      }
    })
  }

  formatCurrency(price, currency: string) {
    return this.customSerice.formatCurrency(price, currency);
  }

  goToPage(value, product: Product) {
    switch (value) {
      case 'product':
        this.appCtrl.getRootNav().push(ProductComponent, { product: product });
        break;
      case 'view_all':
        this.appCtrl.getRootNav().push(ProductCategoryComponent, { shop_guid: this.shopGuid, title: 'Sản Phẩm Nổi Bật', type_product:'feature'});
        break;
      default:
        break;
    }
  }

}
