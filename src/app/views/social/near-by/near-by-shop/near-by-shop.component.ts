import { ShopsService } from './../../../../services/shops.service';
import { App, NavController, LoadingController } from 'ionic-angular';
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
  public datasTMP = [];
  public sFilter: string;
  constructor(public geolocationService: GeolocationService, public nav: NavController, public appCtrl: App, private shopService: ShopsService,
    public loadingCtrl: LoadingController) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();

    this.lat = Number(localStorage.getItem("lat"));
    this.lng = Number(localStorage.getItem("lng"));
    var that = this;
    let geoQueryShop = this.geolocationService.getShops(this.lat, this.lng);
    geoQueryShop.on("key_entered", function (key, location, distance) {
      // console.log(key + " shop query at " + location + " (" + distance + " km from center)");
      let storeGuid = key.substring(key.indexOf('-') + 1, key.length);
      let shopGuid = key.substring(0, key.indexOf('-'));

      that.shopService.getShop(shopGuid, storeGuid).subscribe(data => {
        that.datas.push({ shop: data, distance: distance });
        that.datas.sort(that.compareShop);
        that.datasTMP = that.datas;
      })
    });
    loading.dismiss();
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

  goToShop(guid) {
    this.nav.push(ShopComponent, { guid: guid });
  }
  filter() {
    console.log(1231231);

    this.datas = this.datasTMP;
    this.sFilter = this.sFilter.toLowerCase();
    this.datas = this.datas.filter(e => {
      return e.shop.introduce.toLowerCase().includes(this.sFilter) || e.shop.title.toLowerCase().includes(this.sFilter)
    })
  }
}
