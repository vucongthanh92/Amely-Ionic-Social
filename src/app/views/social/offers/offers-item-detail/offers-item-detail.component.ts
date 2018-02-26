import { CountersOfferComponent } from './../../../../components/counters-offer/counters-offer.component';
import { CustomService } from './../../../../services/custom.service';
import { NavParams, NavController, App, Navbar } from 'ionic-angular';
import { Offer } from './../../../../api/models/offer';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OffersService } from '../../../../services/offers.service';
import { OffersComponent } from '../offers.component';

@Component({
  selector: 'app-offers-item-detail',
  templateUrl: './offers-item-detail.component.html'
})
export class OffersItemDetailComponent implements OnInit {

  offer: Offer;
  product_image: any;
  @ViewChild('navbar') navBar: Navbar;

  constructor(
    private customService: CustomService,
    private offersService: OffersService,
    private navParams: NavParams,
    private nav: NavController,
    private app: App
  ) {
    this.offer = this.navParams.get('param');
    this.product_image = this.offer.product_snapshot.images[0];
    this.customService.getCurrentTime().subscribe(data => {
      this.offer.seconds = this.offer.time_end - data.current_time;
    });
  }

  ngOnInit() {
  }

  changePage(offer) {
    // this.app.getRootNav().push(CountersOfferComponent, { param: offer });

    // let callback = this.params.get("callback");

    // callback(item.item).then(() => {
    //   this.nav.pop();
    // });

    this.app.getRootNav().push(CountersOfferComponent, {
      callback: this.myCallbackFunction,
      param: offer
    });
  }

  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      console.log('item');
      let callback = this.navParams.get("callback");

      callback("test").then(() => {
        this.nav.pop();
      });
      resolve();
    });
  }

}
