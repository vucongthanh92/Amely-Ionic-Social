import { CustomService } from './../../services/custom.service';
import { BusinessComponent } from './../business/business.component';
import { GroupComponent } from './../group/group.component';
import { ShopComponent } from './../shop/shop.component';
import { UserComponent } from './../user/user.component';
import { User } from './../../api/models/user';
import { Shop } from './../../api/models/shop';
import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SearchService } from '../../services/search.service';
import { Group } from '../../api/models/group';
import { Product } from '../../api/models/product';
import { Event } from '../../api/models/event';
import { Business } from '../../api/models/business';
import { ProductComponent } from '../product/product.component';
import { EventComponent } from '../event/event.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  search: string = "peoples";
  isIos: boolean = false;
  contentSearch: string;
  is_has_data: number=0;
  public users: Array<User>;
  public groups: Array<Group>;
  public products: Array<Product>;
  public shops: Array<Shop>;
  public events: Array<Event>;
  public business: Array<Business>;

  constructor(
    private navParams: NavParams,
    public nav: NavController,
    private appCtrl: App,
    private searchService: SearchService,
    private customService: CustomService,
    public loadingCtrl: LoadingController) {
      this.contentSearch = this.navParams.get('param');
  }

  ngOnInit() {
    this.loadData(5);
  }

  loadData(retry) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();

    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.searchService.searchValues(this.contentSearch).subscribe(data => {
      if (data.business) {
       
        this.business = data.business;
        this.is_has_data = 1;
        this.search = 'business';
      }

      if (data.events) {
        this.events = data.events;
        this.is_has_data = 1;
        this.search = 'event';
      }

      if (data.groups) {
        this.groups = data.groups;
        this.is_has_data = 1;
        this.search = 'group';
      }

      if (data.shops) {
        this.shops = data.shops;
        this.is_has_data = 1;
        this.search = 'store';
      }

      if (data.products) {
        this.products = data.products;
        console.log(this.products);
        
        this.is_has_data = 1;
        this.search = 'product';
      }

      if (data.users) {
        this.users = data.users
        this.is_has_data = 1;
        this.search = 'peoples';
      }

      if (!this.users && !this.events && !this.products && !this.groups && !this.shops && !this.business) {
        this.is_has_data = 2;
      }
      loading.dismiss();
      
    }, err => this.loadData(--retry))
  }
  
  formatCurrency(product: Product, currency: string) {
    let result: string;
    switch (currency) {
      case 'VND':
        result = (this.customService.netPrice(product)).toLocaleString('vi-VN', { style: 'decimal', currency: 'VND' }) + ' ₫';
        break;
      case 'USD':
        result = (this.customService.netPrice(product)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        break;
      default:
        result = this.customService.netPrice(product) + ' ' + currency;
        break;
    }
    return result;
  }

  formatSalePrice(price: number, currency: string) {
    return this.customService.formatCurrency(price + "", currency);
  }

  formatDate(time: number) {
    return new Date(time * 1000);
  }

  goToGroupProfile(group: Group) {
    this.nav.push(GroupComponent, { groupGuid: group.guid });
  }

  goToUserProfile(user: User) {
    this.nav.push(UserComponent, { userGuid: user.guid });
  }

  goToShopProfile(shop: Shop) {
    this.nav.push(ShopComponent, { guid: shop.guid });
  }

  goToEventrProfile(event: Event) {
    this.appCtrl.getRootNav().push(EventComponent, { event_guid: event.guid });
  }

  goToBusinessProfile(business: Business) {
    this.nav.push(BusinessComponent, { guid: business.guid });
  }

  goToProduct(product: Product) {
    this.nav.push(ProductComponent, { product: product });
  }

  dismiss() {
    this.nav.pop();
  }
}
