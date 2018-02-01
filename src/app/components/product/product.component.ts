import { Shop } from './../../api/models/shop';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Category } from './../../api/models/category';
import { Product } from './../../api/models/product';
import { Component, OnInit } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { CartItemsComponent } from '../../modules/cart/cart-items/cart-items.component';
import { ProductsService } from '../../services/products.service';
import { inline_response_200_3 } from '../../api/models/inline-_response-_200_3';
import { CustomService } from '../../services/custom.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  public product: Product;
  public categories: Array<Category>;
  private guid: number;
  public shop: Shop;
  constructor(public nav: NavController, public appCtrl: App, private productsService: ProductsService, private navParam: NavParams, private customSerice:CustomService) {
    this.guid = this.navParam.get('guid');
  }

  ngOnInit() {
    this.productsService.getProduct(this.guid).subscribe(data => {
      this.product = data.product;
      this.categories = data.categories;
      this.shop = data.shop;
    });
  }

  formatCurrency(price, currency: string) {
    return this.customSerice.formatCurrency(price, currency);
  }

  changePage() {
    this.appCtrl.getRootNav().push(CartItemsComponent);
  }
  getImage(idImage){
    return this.product.images_entities[idImage];
  }
}
