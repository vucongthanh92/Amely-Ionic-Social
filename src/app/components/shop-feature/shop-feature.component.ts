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
  constructor(private shoppingService: ShoppingsService, private shopService: ShopsService,private appCtrl:App) { }

  ngOnInit() {
    this.shoppingService.getShopFeature().subscribe(data => {
      this.shops = data;
    })
  }
  openShop(shop:Shop){
    this.shopService.clickAdv(shop.advertise_guid).subscribe(data=>{
    });
    this.appCtrl.getRootNav().push(ShopComponent, { guid: shop.guid });
  }
}
