import { Category } from './../../api/models/category';
import { Component, OnInit, Input } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { ShoppingsService } from '../../services/shoppings.service';
import { CategoriesAllComponent } from '../categories-all/categories-all.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  @Input('shopGuid') shopGuid;
  public categories: Array<Category>;
  public categoriesParent: Array<Category>;
  constructor(public nav: NavController, public appCtrl: App, private shoppingService: ShoppingsService) { }

  ngOnInit() {
      this.initShopCategories()
  }

  initShopCategories() {
    this.shoppingService.getCategories(0, 9999, this.shopGuid, 1, 0).subscribe(data => {
      if (data instanceof Array) {
        this.categories = data;
        this.categoriesParent = this.categories.filter(e => e.parent_guid == null || e.parent_guid == "0" || e.parent_guid.length == 0);
      }
    })
  }

  goToPage(category: Category) {
    this.appCtrl.getRootNav().push(ProductCategoryComponent, { guid: category.guid, arr: this.categories ,title:category.title});
  }
  goToPageAll(categories) {
    this.appCtrl.getRootNav().push(CategoriesAllComponent, {arr: this.categories});
  }

}
