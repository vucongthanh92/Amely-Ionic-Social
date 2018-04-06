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
  constructor(public nav: NavController, public appCtrl: App, private shoppingsService: ShoppingsService, public customService: CustomService,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadData(15);
  }

  loadData(retry) {

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
    this.shoppingsService.getVouchers(this.offset, this.limit).subscribe(data => {
      console.log(data);
      this.vouchers = []
      if (data instanceof Array) {
        this.vouchers = data;
      } 
    }, err => this.loadData(--retry));

    this.shoppingsService.getCategories(0, 9999, null, 2, 0).subscribe(data => {
      if (data instanceof Array) {
        this.categories = data;
      } 
    }, err => this.loadData(--retry))
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
}
