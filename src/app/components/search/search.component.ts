import { App } from 'ionic-angular/components/app/app';
import { BusinessComponent } from './../business/business.component';
import { GroupComponent } from './../group/group.component';
import { ShopComponent } from './../shop/shop.component';
import { UserComponent } from './../user/user.component';
import { User } from './../../api/models/user';
import { Shop } from './../../api/models/shop';
import { Component, OnInit, group } from '@angular/core'; 
import { NavController, NavParams } from 'ionic-angular';
import { SearchService } from '../../services/search.service';
import { Group } from '../../api/models/group';
import { Product } from '../../api/models/product';
import { Event } from '../../api/models/event';
import { Business } from '../../api/models/business';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  search: string = "peoples";
  isIos: boolean = false;
  contentSearch: string;
  is_has_data: boolean;
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
    private searchService: SearchService) {
    this.contentSearch = this.navParams.get('param');
  }

  ngOnInit() {
    this.searchService.searchValues(this.contentSearch).subscribe(data => {
      if (data.business) {
        this.business = data.business;
        this.is_has_data = true;
        this.search = 'business';
      }
      if (data.events) {
        this.events = data.events;
        this.is_has_data = true;
        this.search = 'event';
      }

      if (data.groups) {
        this.groups = data.groups;
        this.is_has_data = true;
        this.search = 'group';
      }

      if (data.shops) {
        this.shops = data.shops;
        this.is_has_data = true;
        this.search = 'store';
      }

      if (data.products) {
        this.products = data.products;
        this.is_has_data = true;
        this.search = 'product';
      }

      if (data.users) {
        this.users = data.users
        this.is_has_data = true;
        this.search = 'peoples';
      }
    })
  }

  formatCurrency(amount: string, currency: string) {
    let result: string;
    switch (currency) {
      case 'VND':
        result = (+amount).toLocaleString('vi-VN', { style: 'decimal', currency: 'VND' }) + ' ₫';
        break;
      case 'USD':
        result = (+amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        break;
      default:
        result = amount + ' ' + currency;
        break;
    }
    return result;
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

  }

  goToBusinessProfile(business: Business) {
    this.nav.push(BusinessComponent, { guid: business.guid });
  }

  goToProduct(product: Product) {
    this.nav.push(ProductComponent, { product: product });
  }
}
