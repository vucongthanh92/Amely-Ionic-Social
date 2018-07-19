import { NavParams, NavController } from 'ionic-angular';
import { Product } from './../../api/models/product';
import { Component, OnInit } from '@angular/core';
import { CustomService } from '../../services/custom.service';

@Component({
  selector: 'app-product-snapshot',
  templateUrl: './product-snapshot.component.html'
})
export class ProductSnapshotComponent implements OnInit {
  product:Product
  constructor(private navParams:NavParams,private nav:NavController,private customService:CustomService) { 
    this.product = this.navParams.get("product");
  }

  ngOnInit() {
  }
  dismiss() {
    this.nav.pop();
  }
  formatSalePrice(price: number, currency: string) {
    return this.customService.formatCurrency(price + "", currency);
  }
}
