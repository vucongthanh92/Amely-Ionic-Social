import { NavController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../api/models';
import { CustomService } from '../../services/custom.service';

@Component({
  selector: 'app-product-snapshot-detail',
  templateUrl: './product-snapshot-detail.component.html'
})
export class ProductSnapshotDetailComponent implements OnInit {
  public product: Product
  constructor(private nav: NavController, private customService: CustomService,private navParams:NavParams) { 
    this.product=this.navParams.get("product");
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
