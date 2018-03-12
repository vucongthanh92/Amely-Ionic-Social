import { guid } from './../../../api/models/guid';
import { EventComponent } from './../../../components/event/event.component';
import { ProductComponent } from './../../../components/product/product.component';
import { GroupComponent } from './../../../components/group/group.component';
import { BusinessComponent } from './../../../components/business/business.component';
import { ShopComponent } from './../../../components/shop/shop.component';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Banner } from './../../../api/models/banner';
import { ShopsService } from './../../../services/shops.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { CartItemsComponent } from '../../../modules/cart/cart-items/cart-items.component';


@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
})
export class ShopsComponent implements OnInit {

  banners: Array<Banner>
  constructor(public nav: NavController, public appCtrl: App, private shopService: ShopsService, private iab: InAppBrowser) { }

  ngOnInit() {
    this.shopService.getBanners().subscribe(data => {
      this.banners = data;
      this.banners = this.banners.filter(e => !(e.type == null && e.link == ''))
    })
  }

  openBanner(banner: Banner) {

    if (banner.guid) this.shopService.clickAdv(banner.guid).subscribe(data => { });

    if (!banner.type) {
      // open browser
      const browser = this.iab.create(banner.link);
      browser.on('loadstop').subscribe(data => {
        this.nav.popToRoot();
      });
      browser.on('exit').subscribe(data => {
        this.nav.popToRoot();
      });
    } else {
      switch (banner.type) {
        case 'shop':
          this.appCtrl.getRootNav().push(ShopComponent, { guid: banner.shop_guid })
          break;
        case 'product':
          this.appCtrl.getRootNav().push(ProductComponent, { guid: banner.product_guid });
          break;
        case 'group':
          this.appCtrl.getRootNav().push(GroupComponent, { groupGuid: banner.group_guid });
          break;
        case 'event':
          this.appCtrl.getRootNav().push(EventComponent, { event_guid: banner.event_guid });
          break;
        case 'page':
          this.appCtrl.getRootNav().push(BusinessComponent, { guid: banner.page_guid });
          break;
      }
    }
  }

}
