import { ShopsService } from './../../../../services/shops.service';
import { App, NavController } from 'ionic-angular';
import { GeolocationService } from './../../../../services/geolocation.service';
import { Component, OnInit } from '@angular/core';
import { ShopComponent } from '../../../../components/shop/shop.component';

@Component({
  selector: 'app-near-by-shop',
  templateUrl: './near-by-shop.component.html'
})
export class NearByShopComponent implements OnInit {
  private lat: number;
  private lng: number;
  public datas = [];

  constructor(public geolocationService: GeolocationService, public nav: NavController, public appCtrl: App, private shopService: ShopsService) {
    this.lat = Number(localStorage.getItem("lat"));
    this.lng = Number(localStorage.getItem("lng"));
    var that = this;
    let geoQueryShop = this.geolocationService.getShops(this.lat, this.lng);
    geoQueryShop.on("key_entered", function (key, location, distance) {
      // console.log(key + " shop query at " + location + " (" + distance + " km from center)");
      let storeGuid = key.substring(key.indexOf('-') + 1, key.length);
      let shopGuid = key.substring(0,key.indexOf('-'));
      console.log(shopGuid+"  "+storeGuid);
      
      that.shopService.getShop(shopGuid, storeGuid).subscribe(data => {
        that.datas.push({ shop: data, distance: distance });
        that.datas.sort(that.compareShop);
      })
    });
  }

  formatDistance(km: number) {
    if (km < 1) {
      return Math.floor(km * 1000) + " m"
    } else {
      return km.toFixed(2) + " km"
    }
  }

  compareShop(a, b) {
    if (a.distance < b.distance)
      return -1;
    if (a.distance > b.distance)
      return 1;
    return 0;
  }

  ngOnInit() {
  }

  goToShop(guid){
    console.log(guid);
    
    this.nav.push(ShopComponent, { guid: guid });
  }
}
