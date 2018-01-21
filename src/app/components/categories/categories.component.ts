import { Component, OnInit } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { ProductCategoryComponent } from '../product-category/product-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }

  goToPage() {
  	this.appCtrl.getRootNav().push(ProductCategoryComponent);
  }

}
