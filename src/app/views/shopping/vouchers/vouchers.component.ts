import { Category } from './../../../api/models/category';
import { Product } from './../../../api/models/product';
import { Component, OnInit } from '@angular/core';
import { App, NavController, LoadingController } from 'ionic-angular';
import { ProductComponent } from '../../../components/product/product.component';
import { ProductCategoryComponent } from '../../../components/product-category/product-category.component';
import { ShoppingsService } from '../../../services/shoppings.service';
import { CustomService } from '../../../services/custom.service';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html'
})

export class VouchersComponent implements OnInit {
  fakeUsers: Array<any> = new Array(5);
  public vouchers: Array<Product>;
  public categories: Array<Category>;
  public offset: number = 0;
  public limit: number = 20;
  public device_screen: string;
  public isHiddenLoadmore: boolean = false;
  constructor(
    public nav: NavController,
    public appCtrl: App,
    private shoppingsService: ShoppingsService,
    public customService: CustomService,
    public loadingCtrl: LoadingController
  ) {
    this.device_screen = customService.checkDevices();
  }

  ngOnInit() {
    this.loadData(5, null);
    this.loadCategories(5)
  }

  loadData(retry, infiniteScroll) {

    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   enableBackdropDismiss: true
    // });
    // loading.present();

    if (retry == 0) {
      // loading.dismiss();
      if (infiniteScroll) infiniteScroll.complete();
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.shoppingsService.getVouchers(this.offset, this.limit).subscribe(data => {
      if (this.vouchers == null || this.vouchers == undefined) {
        this.vouchers = []

      }
      if (infiniteScroll) infiniteScroll.complete();
      if (data instanceof Array) {
        this.vouchers = this.vouchers.concat(data);
      }else {
        this.isHiddenLoadmore=true
      }
    }, err => this.loadData(--retry, infiniteScroll));

  }

  loadCategories(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.shoppingsService.getCategories(0, 9999, null, 2, 0).subscribe(data => {
      if (data instanceof Array) {
        this.categories = data;
      }
    }, err => this.loadCategories(--retry))
  }

  doInfinite(infiniteScroll) {
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   enableBackdropDismiss: true
    // });
    // loading.present();
    this.offset = this.offset + this.limit;
    this.loadData(5, infiniteScroll);
  }
  goToPage(value, voucher: Product, category: Category) {
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

  formatCurrency(voucher: Product) {
    return this.customService.formatCurrency(this.customService.netPrice(voucher) + "", voucher.currency);
  }

  formatSalePrice(price: number, currency: string) {
    return this.customService.formatCurrency(price + "", currency);
  }

  getDiscountPercent(product: Product) {
    return (100 - ((product.display_price * 100) / product.display_old_price));
  }

  getEndDate(endDate: number) {
    return new Date(endDate * 1000)
  }
}
