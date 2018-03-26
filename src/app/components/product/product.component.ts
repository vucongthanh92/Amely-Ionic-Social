import { Shop } from './../../api/models/shop';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Category } from './../../api/models/category';
import { Product } from './../../api/models/product';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { CartItemsComponent } from '../../modules/cart/cart-items/cart-items.component';
import { ProductsService } from '../../services/products.service';
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
  count_product: number;
  // cart = [];

  constructor(
    public nav: NavController,
    public appCtrl: App,
    private productsService: ProductsService,
    private navParam: NavParams,
    private customService: CustomService) {

    this.product = this.navParam.get('product');
    this.guid = this.navParam.get('guid');
  }

  ngOnInit() {
    if (!this.product) {

    }
  }

  loadData(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.productsService.getProduct(this.guid).subscribe(data => {
      this.product = data.product;
      this.categories = data.categories;
      this.shop = data.shop;
    }, err => this.loadData(--retry));
  }
  changePage() {
    this.appCtrl.getRootNav().push(CartItemsComponent);
  }

  ionViewDidEnter() {
    this.count_product = this.customService.cart.length;
  }

  formatCurrency(price, currency: string) {
    return this.customService.formatCurrency(price, currency);
  }

  putCartLocal(product) {
    let item = this.customService.cart.filter(data => data.guid == product.guid);
    if (item.length > 0) {
      item[0].quantity_cart = item[0].quantity_cart + 1;
    } else {
      product.quantity_cart = 1;
      this.customService.cart.push(product);
    }

    this.count_product = this.customService.cart.length;
  }

  getImage(idImage) {
    return this.product.images_entities[idImage];
  }
}
