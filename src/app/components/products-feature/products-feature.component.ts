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

  constructor(public nav: NavController, public appCtrl: App, private shopService: ShopsService,
    private shoppingSerivce: ShoppingsService, public customService: CustomService, public loadingCtrl: LoadingController) { }

  ngOnInit() {
    if (this.is_feature) {
      this.getProductsFeature(5);
    } else if (this.shopGuid != undefined) {
      this.initShopProductFeatue();
    } else {
      this.getMostSold(5);
    }
  }

  getProductsFeature(retry) {
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   enableBackdropDismiss: true
    // });
    // loading.present();

    if (retry == 0) {
      // loading.dismiss();
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.shoppingSerivce.getProductsFeature().subscribe(data => {
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
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.shoppingSerivce.getMostSoldProducts().subscribe(data => {
      if (data instanceof Array) {
        this.productsMostSold = data;
      }
    }, err => this.getMostSold(--retry))

    // loading.dismiss();

  }
  initShopProductFeatue() {
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   enableBackdropDismiss: true
    // });
    // loading.present();

    // "default" "feature"
    this.shoppingSerivce.getProducts(null, this.shopGuid, "feature", null, 0, 0, 10).subscribe(data => {
      if (data.products instanceof Array) {
        // loading.dismiss();
        this.productsMostSold = data.products;
      }
    })
  }

  // formatCurrency(product: Product, currency: string) {
  //   return this.customService.formatCurrency(this.customService.netPrice(product) + '', currency);
  // }

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
        this.appCtrl.getRootNav().push(ProductCategoryComponent, { shop_guid: this.shopGuid, title: 'Sản Phẩm Nổi Bật', type_product: 'feature', product: product });
        break;
      default:
        break;
    }
  }

}
