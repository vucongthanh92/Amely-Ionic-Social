import { CustomService } from './../../services/custom.service';
import { ShoppingsService } from './../../services/shoppings.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../api/models/category';
import { App, NavParams } from 'ionic-angular';
import { Product } from '../../api/models/product';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html'
})
export class ProductCategoryComponent implements OnInit {
  private category_id: number;
  private categories: Array<Category>;
  private shop_guid: number;
  private type_product: string;
  public categories_parent: Array<Category> = [];
  public products: Array<Product>;
  private offset: number = 0;
  private limit: number = 10;
  public title: string;

  constructor(private navParams: NavParams, private appCtrl: App, private shopping_service: ShoppingsService, public custom_service: CustomService) {
    this.categories = navParams.get('arr');
    this.category_id = navParams.get('guid');
    this.shop_guid = navParams.get('shop_guid');
    this.type_product = navParams.get('type_product');
    this.title = navParams.get('title');
    if (this.categories)
      this.categories_parent = this.categories.filter(e => +e.parent_guid == this.category_id);

  }

  ngOnInit() {
    this.loadData(5)
  }

  loadData(retry) {
    if (retry == 0) {
      this.custom_service.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.shopping_service.getProducts(this.category_id, this.shop_guid, this.type_product, null, 0, this.offset, this.limit).subscribe(data => {
      if (data.products instanceof Array) {
        this.products = data.products;
      }
    }, err => this.loadData(--retry));
  }

  goToSubCat(category) {
    this.appCtrl.getRootNav().push(ProductCategoryComponent, { guid: category.guid, arr: this.categories });
  }
  showDescription(desc: string) {
    return desc.length > 50 ? desc.substring(0, 50) + " ..." : desc;
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.offset = this.offset + this.limit;
      this.shopping_service.getProducts(this.category_id, this.shop_guid, this.type_product, null, 0, this.offset, this.limit).subscribe(data => {
        if (data.products instanceof Array) {
          this.products = this.products.concat(data.products);
        }
      });
      infiniteScroll.complete();
    }, 500);
  }
}
