import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { CreateOfferComponent } from '../../../components/create-offer/create-offer.component';
import { OffersMyselfComponent } from './offers-myself/offers-myself.component';
import { OffersPendingComponent } from './offers-pending/offers-pending.component';
import { OffersSearchComponent } from './offers-search/offers-search.component';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html'
})
export class OffersComponent implements OnInit {

  offersTab = 'myself';
  constructor(public nav: NavController, public appCtrl: App) {}
  
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
