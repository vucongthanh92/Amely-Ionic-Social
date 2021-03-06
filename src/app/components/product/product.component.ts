import { Shop } from './../../api/models/shop';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Category } from './../../api/models/category';
import { Product } from './../../api/models/product';
import { Component, OnInit } from '@angular/core';
import { App, NavController, LoadingController } from 'ionic-angular';
import { CartItemsComponent } from '../../modules/cart/cart-items/cart-items.component';
import { ProductsService } from '../../services/products.service';
import { CustomService } from '../../services/custom.service';
import { ShopComponent } from '../shop/shop.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})

export class ProductComponent implements OnInit {
  public product: Product;
  public categories: Array<Category>;
  private guid: number;
  public shop: Shop;
  public device_screen: string;
  count_product: number;
  // cart = [];
  imageProduct: any = [];
  imagesA: any = [];

  constructor(
    public nav: NavController,
    public appCtrl: App,
    private productsService: ProductsService,
    private navParam: NavParams,
    public customService: CustomService,
    public loadingCtrl: LoadingController
  ) {
      this.product = this.navParam.get('product');
      this.guid = this.navParam.get('guid');
      this.device_screen = customService.checkDevices();
  }

  ngOnInit() {
    // if (!this.product) {
      this.loadData(5);
    // }
  }

  loadData(retry) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();

    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.productsService.getProduct(this.product ? this.product.guid:this.guid).subscribe(data => {
      loading.dismiss();
      console.log(data);
      
      this.product = data.product;
      this.imagesA = data.product.images;
      this.imagesA.forEach(e => {
        this.imageProduct.push(data.product.images_entities[e])
      });
      
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

  formatCurrency(product: Product, currency: string) {
    return this.customService.formatCurrency(this.customService.netPrice(product) + "", currency);
  }

  formatSalePrice(price : number, currency: string) {
    return this.customService.formatCurrency(price + "", currency);
  }

  putCartLocal(product) {
    let item = this.customService.cart.filter(data => data.guid == product.guid);
    if (item.length > 0) {
      if (item[0].quantity_cart < item[0].quantity) {
        item[0].quantity_cart = item[0].quantity_cart + 1;
      }else{
        this.customService.toastMessage('Số lượng sản phẩm đã hết!', 'bottom', 3000);
      }
    } else {
      product.quantity_cart = 1;
      this.customService.cart.push(product);
    }

    this.count_product = this.customService.cart.length;
  }

  getImage(idImage) {
    return this.product.images_entities[idImage];
  }

  openShop() {
    this.appCtrl.getRootNav().push(ShopComponent, { guid: this.shop.guid });
  }

  dismiss() {
    this.nav.pop();
  }
}
