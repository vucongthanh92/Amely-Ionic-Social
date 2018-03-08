import { OffersItemDetailComponent } from './../offers-item-detail/offers-item-detail.component';
import { OffersService } from './../../../../services/offers.service';
import { Component, OnInit } from '@angular/core';
import { CounterOffer } from '../../../../api/models/counter-offer';
import { App } from 'ionic-angular';

@Component({
  selector: 'app-offers-pending',
  templateUrl: './offers-pending.component.html'
})
export class OffersPendingComponent implements OnInit {
  counterOffers: Array<CounterOffer> = [];
  constructor(private offerService: OffersService, private app: App) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.offerService.getCounterOffers(0, 9999).subscribe(data => {
      if (data instanceof Array) {
        this.counterOffers = data;
      }
    });
  }

  getTimeString(time: number) {
    return new Date(time * 1000);
  }

  detail(counterOffer) {
    this.app.getRootNav().push(OffersItemDetailComponent, {
      callback: this.myCallbackFunction,
      cOffer: counterOffer
    });
  }


  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}
