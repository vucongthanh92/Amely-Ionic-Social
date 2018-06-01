import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { OffersMyselfComponent } from './offers-myself/offers-myself.component';
import { OffersPendingComponent } from './offers-pending/offers-pending.component';
import { OffersSearchComponent } from './offers-search/offers-search.component';
import { CustomService } from '../../../services/custom.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html'
})

export class OffersComponent implements OnInit {
  public device_screen: string;
  offersTab = 'myself';

  constructor(
    public nav: NavController,
    public customService: CustomService,
    public appCtrl: App
  ) {
    this.device_screen = customService.checkDevices();
  }
  
  ngOnInit() {
  }

  tab1Root = OffersMyselfComponent;
  tab2Root = OffersPendingComponent;
  tab3Root = OffersSearchComponent;

  myselfPage = true;
  pendingPage = false;
  searchPage = false;

  goToPage(value) {
    switch (value) {
      case 'myself':
        this.myselfPage = true;
        this.pendingPage = false;
        this.searchPage = false;
        break;
      case 'pending':
        this.myselfPage = false;
        this.pendingPage = true;
        this.searchPage = false;
        break;
      case 'search':
        this.myselfPage = false;
        this.pendingPage = false;
        this.searchPage = true;
        break;
      case 'create-offer':
        // this.appCtrl.getRootNav().push(CreateOfferComponent);
      default:
        break;
    }
  }
}
