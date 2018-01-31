import { Category } from './../../api/models/category';
import { Component, OnInit } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { ShoppingsService } from '../../services/shoppings.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  public categories: Array<Category>;
  public categoriesParent: Array<Category>;
  constructor(public nav: NavController, public appCtrl: App, private shoppingService: ShoppingsService) { }

  ngOnInit() {
    this.shoppingService.getCategories(0, 9999, null, 1, 0).subscribe(data => {
      if (data instanceof Array) {
        this.categories = data;
        this.categoriesParent = this.categories.filter(e => e.parent_guid == null || e.parent_guid == "0" || e.parent_guid.length == 0);
      }
    })
  }

  goToPage(category: Category) {
    this.appCtrl.getRootNav().push(ProductCategoryComponent);
  }

}
