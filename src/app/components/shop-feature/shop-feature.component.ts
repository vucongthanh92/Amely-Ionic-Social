import { CustomService } from './../../services/custom.service';
import { ShopComponent } from './../shop/shop.component';
import { ShoppingsService } from './../../services/shoppings.service';
import { ShopsService } from './../../services/shops.service';
import { Component, OnInit } from '@angular/core';
import { Shop } from '../../api/models';
import { App } from 'ionic-angular';

@Component({
  selector: 'app-shop-feature',
  templateUrl: './shop-feature.component.html'
})
export class ShopFeatureComponent implements OnInit {

  shops: Array<Shop>
  constructor(private shoppingService: ShoppingsService, private shopService: ShopsService, private appCtrl: App,
    private customService: CustomService) { }

  ngOnInit() {
    this.loadData(5);
  }

  loadData(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.shoppingService.getShopFeature().subscribe(data => {
      this.shops = data;
    }, err => this.loadData(--retry))
  }

  openShop(shop: Shop) {
    this.shopService.clickAdv(shop.advertise_guid).subscribe(data => {
    });
    this.appCtrl.getRootNav().push(ShopComponent, { guid: shop.guid });
  }
}
