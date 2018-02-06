import { Shop } from './../../api/models/shop';
import { Component, OnInit, Input } from '@angular/core';
import { ShopsService } from '../../services/shops.service';
import { App, NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {
  public shop: Shop;
  public shopGuid;
  constructor(public nav: NavController, public appCtrl: App, private shopService: ShopsService, private navParams : NavParams) {
    this.shopGuid = this.navParams.get('guid');
   }

  ngOnInit() {
    this.shopService.getShop(this.shopGuid, null).subscribe(data => {
      this.shop = data;
    })
  }

  shopTab = 'products';
  productsPage = true;
  infoPage = false;

  goToPage(value) {
    switch (value) {
      case 'products':
        this.productsPage = true;
        this.infoPage = false;
        break;
      case 'info':
        this.productsPage = false;
        this.infoPage = true;
        break;
      default:
        break;
    }
  }
}
