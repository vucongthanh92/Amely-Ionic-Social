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
  constructor(
    private nav: NavController, 
    private appCtrl: App, 
    private offersService: OffersService) { }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.offersService.getOffers(0, 9999, null).subscribe(data => {
      if (data instanceof Array) {
        this.offers = data;
      }
    })
  }

  changePage(offer) {
    // this.nav.push(OffersItemDetailComponent, { param: offer });
    // this.nav.setRoot(OffersItemDetailComponent, { param: offer });
    // this.nav.
    // console.log(this.appCtrl.getActiveNav().canGoBack());
    // this.nav.push(OffersItemDetailComponent, { param: offer });
    this.appCtrl.getRootNav().push(OffersItemDetailComponent, {
      callback: this.myCallbackFunction,
      param: offer
    });
  }

  goToPage() {
    
  }

  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      console.log('asd');
      this.nav.setRoot(this.nav.getActive().component);
      resolve();
    });
  }
}
