import { Offer } from './../../../../api/models/offer';
import { OffersService } from './../../../../services/offers.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { OffersItemDetailComponent } from '../offers-item-detail/offers-item-detail.component';

@Component({
  selector: 'app-offers-myself',
  templateUrl: './offers-myself.component.html'
})
export class OffersMyselfComponent implements OnInit {
  public offers: Array<Offer> = [];
  constructor(public nav: NavController, public appCtrl: App, private offersService: OffersService) { }

  ngOnInit() {
    this.offersService.getOffers(0, 9999, null).subscribe(data => {
      if (data instanceof Array) {
        this.offers = data;
      }
    })
  }

  changePage(offer) {
    this.appCtrl.getRootNav().push(OffersItemDetailComponent, { param: offer });
  }
}
