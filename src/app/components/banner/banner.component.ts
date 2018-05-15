import { ShopComponent } from './../shop/shop.component';
import { Component, OnInit } from '@angular/core';
import { Banner } from '../../api/models';
import { ShopsService } from '../../services/shops.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NavController, App } from 'ionic-angular';
import { ProductComponent } from '../product/product.component';
import { GroupComponent } from '../group/group.component';
import { EventComponent } from '../event/event.component';
import { BusinessComponent } from '../business/business.component';
import { CustomService } from '../../services/custom.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit {
  public banners: Array<Banner>
  constructor(private shopService: ShopsService, private iab: InAppBrowser, private nav: NavController, private appCtrl: App, private customService: CustomService) { }

  ngOnInit() {
    this.loadData(5);
  }

  loadData(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.shopService.getBanners().subscribe(data => {
      this.banners = data;
      this.banners = this.banners.filter(e => !(e.type == null && e.link == ''))
    }, err => this.loadData(--retry))
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
