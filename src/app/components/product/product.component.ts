import { Shop } from './../../api/models/shop';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Category } from './../../api/models/category';
import { Product } from './../../api/models/product';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
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
  count_product: number;
  // cart = [];

  constructor(
    public nav: NavController, 
    public appCtrl: App, 
    private productsService: ProductsService, 
    private navParam: NavParams, 
    private customSerice:CustomService) {

    this.product = this.navParam.get('product');
  }

  ngOnInit() {
    // this.productsService.getProduct(this.guid).subscribe(data => {
    //   this.product = data.product;
    //   this.categories = data.categories;
    //   this.shop = data.shop;
    // });
  }

  changePage() {
    this.appCtrl.getRootNav().push(CartItemsComponent);
  }

  ionViewDidEnter() {
    this.count_product = this.customSerice.cart.length;
  }
  
  formatCurrency(price, currency: string) {
    return this.customSerice.formatCurrency(price, currency);
  }

  putCartLocal(product) {
    let item = this.customSerice.cart.filter( data => data.guid == product.guid);
    if (item.length > 0) {
      item[0].quantity_cart = item[0].quantity_cart + 1;
    } else {
      product.quantity_cart = 1;
      this.customSerice.cart.push(product);
    }
    
    this.count_product = this.customSerice.cart.length;
  }

  getImage(idImage){
    return this.product.images_entities[idImage];
  }
}
