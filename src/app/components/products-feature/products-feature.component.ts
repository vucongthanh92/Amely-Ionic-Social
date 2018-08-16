import { ProductCategoryComponent } from './../product-category/product-category.component';
import { Component, OnInit, Input } from '@angular/core';
import { App, NavController, LoadingController } from 'ionic-angular';
import { ProductComponent } from '../product/product.component';
import { ShoppingsService } from '../../services/shoppings.service';
import { Product } from '../../api/models/product';
import { CustomService } from '../../services/custom.service';
import { ShopsService } from '../../services/shops.service';

@Component({
  selector: 'app-products-feature',
  templateUrl: './products-feature.component.html'
})

export class ProductsFeatureComponent implements OnInit {
  public productsMostSold: Array<Product> = [];
  @Input('shopGuid') shopGuid;
  @Input('is_feature') is_feature: boolean;
  isHasData: boolean = false;

  constructor(public nav: NavController, public appCtrl: App, private shopService: ShopsService,
    private shoppingSerivce: ShoppingsService, public customService: CustomService, public loadingCtrl: LoadingController) { }

  ngOnInit() {
    if (this.is_feature && !this.shopGuid) {
      this.getProductsFeature(5);
      console.log("feature");
    } else if (!this.is_feature && !this.shopGuid) {
      console.log("mostsold");
      this.getMostSold(5);
    }
    else if (this.shopGuid && this.is_feature) {
      this.initShopProductFeatue();
      console.log("shop_feature");
    }
    else if (this.shopGuid && !this.is_feature) {
      this.initShopMostSoldProduct();
      console.log("shop_mostsold");
    }
  }

  getProductsFeature(retry) {
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   enableBackdropDismiss: true
    // });
    // loading.present();

    if (retry == 0) {
      this.isHasData = true;
      // loading.dismiss();
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.shoppingSerivce.getProductsFeature().subscribe(data => {
      this.isHasData = true;
      // loading.dismiss();
      this.productsMostSold = data;
    }, err => this.getProductsFeature(--retry));
  }

  getMostSold(retry) {

    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   enableBackdropDismiss: true
    // });
    // loading.present();

    if (retry == 0) {
      // loading.dismiss();
      this.isHasData = true;
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.shoppingSerivce.getMostSoldProducts().subscribe(data => {
      this.isHasData = true;
      if (data instanceof Array) {
        this.productsMostSold = data;
      }
    }, err => this.getMostSold(--retry))

    // loading.dismiss();

  }
  initShopProductFeatue() {
    this.retryInitShopProductFeatue(5);
  }

  initShopMostSoldProduct() {
  this.retryInitShopMostSoldProduct(5);
  }

  retryInitShopProductFeatue(retry) {
    if (retry == 0) {
      this.isHasData = true;
      return;
    }
    this.shoppingSerivce.getShopFeatureProducts(this.shopGuid).subscribe(data => {
      this.isHasData = true;
      if (data instanceof Array) {
        // loading.dismiss();
        this.productsMostSold = data;
      }
    }, err => this.retryInitShopProductFeatue(--retry))
  }

  retryInitShopMostSoldProduct(retry) {
    if (retry == 0) {
      this.isHasData = true;
      return;
    }
    this.shoppingSerivce.getShopMostSoldProducts(this.shopGuid).subscribe(data => {
      this.isHasData = true;
      if (data instanceof Array) {
        // loading.dismiss();
        this.productsMostSold = data;
      }
    }, err => this.retryInitShopProductFeatue(--retry))
  }

  formatSalePrice(price: number, currency: string) {
    return this.customService.formatCurrency(price + "", currency);
  }
  goToPage(value, product: Product) {
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   enableBackdropDismiss: true
    // });

    // loading.present();
    switch (value) {
      case 'product':
        // loading.dismiss();
        if (this.is_feature) this.shopService.clickAdv(product.advertise_guid).subscribe(data => {
        });
        // this.appCtrl.getRootNav().push(ProductComponent, { product: product });
        this.appCtrl.getRootNav().push(ProductComponent, { guid: product.guid });
        break;
      case 'all':
        // loading.dismiss();
        if (this.is_feature) {
          this.appCtrl.getRootNav().push(ProductCategoryComponent, { shop_guid: this.shopGuid, title: 'Sản Phẩm Nổi Bật', type_product: 'feature', product: product });
        }else{
          this.appCtrl.getRootNav().push(ProductCategoryComponent, { shop_guid: this.shopGuid, title: 'Sản Phẩm Bán Chạy', type_product: 'default', product: product });
        }
        break;
      default:
        break;
    }
  }

}
