import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../api/models';
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { NavController, App, NavParams } from 'ionic-angular';
import { ShoppingsService } from '../../services/shoppings.service';

@Component({
  selector: 'app-categories-all',
  templateUrl: './categories-all.component.html'
})
export class CategoriesAllComponent implements OnInit {
  @Input('shopGuid') shopGuid;
  public categories: Array<Category>;
  public categoriesParent: Array<Category>;
  constructor(public nav: NavController, public appCtrl: App, private navParams: NavParams) { 
    this.categories = navParams.get('arr');
    this.categoriesParent = this.categories.filter(e => e.parent_guid == null || e.parent_guid == "0" || e.parent_guid.length == 0);
  }

  ngOnInit() {
  }


  goToPage(category: Category) {
    this.appCtrl.getRootNav().push(ProductCategoryComponent, { guid: category.guid, arr: this.categories, title: category.title });
  }

}
