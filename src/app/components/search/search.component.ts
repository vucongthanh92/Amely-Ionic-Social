import { SearchResponse, HitEntry } from './../../services/search.service';
import { CustomService } from './../../services/custom.service';
import { BusinessComponent } from './../business/business.component';
import { GroupComponent } from './../group/group.component';
import { ShopComponent } from './../shop/shop.component';
import { UserComponent } from './../user/user.component';
import { User } from './../../api/models/user';
import { Shop } from './../../api/models/shop';
import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SearchService, SearchRequest } from '../../services/search.service';
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
  is_has_data: number = 0;
  public users: Array<User>;
  public groups: Array<Group>;
  public products: Array<Product>;
  public shops: Array<Shop>;
  public events: Array<Event>;
  public business: Array<Business>;
  private limit = 10;
  private offset = 0;
  public searchResponse: SearchResponse;
  public userCurrent: User;
  public hits: Array<HitEntry>
  constructor(
    private navParams: NavParams,
    public nav: NavController,
    private appCtrl: App,
    private searchService: SearchService,
    private customService: CustomService,
    public loadingCtrl: LoadingController) {
    this.contentSearch = this.navParams.get('param');
    this.userCurrent = this.customService.user_current;
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();
    this.loadData(5, loading, false, null);
  }

  loadData(retry: number, loading, isLoadmore: boolean, infiniteScroll) {
    // console.log(retry);

    // if (retry == 0) {
    //   if (!isLoadmore) {
    //     this.is_has_data = 2;
    //     loading.dismiss();
    //   } else {
    //     infiniteScroll.complete();
    //   }
    // }
    this.searchService.elasticSearch(new SearchRequest(this.offset, this.limit, "*" + this.contentSearch + "*"))
      .then((data: SearchResponse) => {
        if (!isLoadmore) {
          if (loading) loading.dismiss();
          this.is_has_data = 1;
          this.searchResponse = data;
          this.hits = data.hits.hits;
        } else {
          this.hits = this.hits.concat(data.hits.hits);
          if (infiniteScroll) infiniteScroll.complete();
        }
        console.log(this.searchResponse.hits.hits);

      })
      .catch(err => {
        console.log(err);
        if (!isLoadmore) {
          this.is_has_data = 2;
          if (loading) loading.dismiss();
        } else {
          if (infiniteScroll) infiniteScroll.complete();
        }
        // this.loadData(--retry, loading, isLoadmore, infiniteScroll)
      })
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

  dismiss() {
    this.nav.pop();
  }

  goToDetail(entry: HitEntry) {
    switch (entry._type) {
      case 'user':
        this.nav.push(UserComponent, { userGuid: entry._id });
        break;
      case 'business':
        this.nav.push(BusinessComponent, { guid: entry._id });
        break;
      case 'product':
        this.nav.push(ProductComponent, { guid: entry._id });
        break;
      case 'event':
        this.appCtrl.getRootNav().push(EventComponent, { event_guid: entry._id });
        break;
      case 'group':
        this.nav.push(GroupComponent, { groupGuid: entry._id });
        break;
      case 'shop':
        this.nav.push(ShopComponent, { guid: entry._id });
        break;
    }
  }
  doInfinite(infiniteScroll) {
    this.offset += this.limit;
    if (this.offset < this.searchResponse.hits.total) {
      console.log(this.offset + "  " + this.limit);
      this.loadData(5, null, true, infiniteScroll);
    }
  }

}
