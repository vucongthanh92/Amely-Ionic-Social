import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { OffersItemDetailComponent } from '../offers-item-detail/offers-item-detail.component';

@Component({
  selector: 'app-offers-myself',
  templateUrl: './offers-myself.component.html'
})
export class OffersMyselfComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) { }

  ngOnInit() {
  }

  changePage() {
    this.appCtrl.getRootNav().push(OffersItemDetailComponent);
  }
}
