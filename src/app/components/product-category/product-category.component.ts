import { ProductComponent } from './../product/product.component';
import { CustomService } from './../../services/custom.service';
import { ShoppingsService } from './../../services/shoppings.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../api/models/category';
import { NavParams, LoadingController, App } from 'ionic-angular';
import { Product } from '../../api/models/product';
import { ProductsService } from '../../services/products.service';
import { NavController } from 'ionic-angular/navigation/nav-controller';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html'
})
export class ProductCategoryComponent implements OnInit {
  fakeUsers: Array<any> = new Array(10);
  private category_id: number;
  private categories: Array<Category>;
  private shop_guid: number;
  private type_product: string;
  public categories_parent: Array<Category> = [];
  public products: Array<Product>;
  private offset: number = 0;
  private limit: number = 10;
  public title: string;
  public category_selected: Category;
  public search_content: string;
  public is_search: boolean;
  private isLoadMore: boolean;

  constructor(
    private navParams: NavParams, 
    private shopping_service: ShoppingsService, 
    public custom_service: CustomService,
    private customService: CustomService, 
    public loadingCtrl: LoadingController, 
    private appCtrl: App, 
    private productService: ProductsService, 
    private nav:NavController) {
      this.categories = this.navParams.get('arr');
      this.category_id = this.navParams.get('guid');
      this.shop_guid = this.navParams.get('shop_guid');
      this.type_product = this.navParams.get('type_product');
      this.title = this.navParams.get('title');
      if (this.categories)
        this.categories_parent = this.categories.filter(e => +e.parent_guid == this.category_id);
  }

  ngOnInit() {
    this.loadData(5)
  }


  formatCurrency(product: Product) {
    return this.custom_service.formatCurrency(this.custom_service.netPrice(product) + "", product.currency);
  }

  formatSalePrice(price: number, currency: string) {
    return this.customService.formatCurrency(price + "", currency);
  }

  loadData(retry) {

    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   enableBackdropDismiss: true
    // });
    // loading.present();

    if (retry == 0) {
      // loading.dismiss();
      this.custom_service.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.shopping_service.getProducts(this.category_id, this.shop_guid, this.type_product, null, 0, this.offset, this.limit).subscribe(data => {
      // loading.dismiss();
      if (data.products instanceof Array) {
        this.products = data.products;
      }
    }, err => this.loadData(--retry));
  }

  goToSubCat() {
    console.log(this.category_selected);
    this.category_id = this.category_selected.guid;
    this.products = [];
    this.loadData(5)
    // this.appCtrl.getRootNav().push(ProductCategoryComponent, { guid: category.guid, arr: this.categories });
  }
  showDescription(desc: string) {
    return desc.length > 50 ? desc.substring(0, 50) + " ..." : desc;
  }

  doInfinite(infiniteScroll) {

    setTimeout(() => {
      this.offset = this.offset + this.limit;
      if (!this.isLoadMore) {
        this.shopping_service.getProducts(this.category_id, this.shop_guid, this.type_product, null, 0, this.offset, this.limit).subscribe(data => {
          if (data.products instanceof Array) {
            this.products = this.products.concat(data.products);
          }
        });
      }
      infiniteScroll.complete();
    }, 500);
  }

  search() {
    this.is_search = !this.is_search;
    if (!this.is_search) {
      if (this.search_content != undefined && this.search_content != "") {
        // this.customService.goToPageSearch(this.search_content,this.nav);
        this.productService.searchProduct(this.search_content, this.category_id, 'product').subscribe(data => {
          this.isLoadMore = true;
          if (data.products) {
            this.products = data.products;
          } else this.custom_service.toastMessage('Không có dữ liệu', 'bottom', 3000);
        })
      } else {
        this.customService.toastMessage('Nhập dữ liệu tìm kiếm', 'bottom', 3000)
      }
    }
  }
  openProductDetail(product: Product) {
    this.appCtrl.getRootNav().push(ProductComponent, { guid: product.guid })
  }

  dismiss() {
    this.nav.pop();
  }

}
