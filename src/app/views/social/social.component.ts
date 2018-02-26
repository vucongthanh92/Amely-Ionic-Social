import { SearchComponent } from './../../components/search/search.component';
import { MenuController } from 'ionic-angular';
import { Component, OnInit, Input } from '@angular/core';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { OffersComponent } from './offers/offers.component';
import { NearByComponent } from './near-by/near-by.component';
import { EventsComponent } from './events/events.component';
import { CustomService } from '../../services/custom.service';
import { App, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',

})
export class SocialComponent implements OnInit {
  @Input('search') search_content: string;
  is_search_show: boolean;
  tab1Root = NewsFeedComponent;
  tab2Root = OffersComponent;
  tab3Root = NearByComponent;
  tab4Root = EventsComponent;
  tab5Root = NearByComponent;
  tab6Root = EventsComponent;
  abcdef: any;
  constructor(
    public nav: NavController, public appCtrl: App, public navParams: NavParams,
    public menuCtrl: MenuController,
    public customService: CustomService
  ) {
    // this.menuCtrl.enable(true, 'mainMenu');
    // this.abcdef = "dasdfas";

  }
  ngOnInit() {
  }
  ionViewDidEnter() {
    console.log('1');
  }

  search() {
    this.is_search_show = !this.is_search_show;
    if (!this.is_search_show) {
      if (this.search_content != undefined && this.search_content.length > 3) {
        // this.customService.goToPageSearch(this.search_content,this.nav);
        this.nav.push(SearchComponent, { param: this.search_content, service: this })
      } else {
        this.customService.toastMessage('Tìm kiếm phải lớn hơn 3 ký tự', 'bottom', 3000)
      }
    }
  }
}
