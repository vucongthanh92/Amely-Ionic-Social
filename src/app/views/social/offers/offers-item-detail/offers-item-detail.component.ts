import { CountersOfferComponent } from './../../../../components/counters-offer/counters-offer.component';
import { CustomService } from './../../../../services/custom.service';
import { NavParams, NavController, App } from 'ionic-angular';
import { Offer } from './../../../../api/models/offer';
import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../../../services/offers.service';

@Component({
  selector: 'app-offers-item-detail',
  templateUrl: './offers-item-detail.component.html'
})
export class OffersItemDetailComponent implements OnInit {

  offer: Offer;
  product_image: any;

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
    this.app.getRootNav().push(CountersOfferComponent, { param: offer });
  }

}
