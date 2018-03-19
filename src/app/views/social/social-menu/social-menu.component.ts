import { OfferBookmarkComponent } from './../offers/offer-bookmark/offer-bookmark.component';
import { HistoryOfferComponent } from './../../../modules/history/history-offer/history-offer.component';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';

@Component({
  selector: 'app-social-menu',
  templateUrl: './social-menu.component.html'
})
export class SocialMenuComponent implements OnInit {

  constructor(private appCtrl: App, private nav: NavController) { }

  ngOnInit() {
  }

  historyOffer() {
    this.appCtrl.getRootNav().push(HistoryOfferComponent);
    this.nav.pop();
  }

  openBookmarks() {
    this.appCtrl.getRootNav().push(OfferBookmarkComponent);
    this.nav.pop();
  }
}