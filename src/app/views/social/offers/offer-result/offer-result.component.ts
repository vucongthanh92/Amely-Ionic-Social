import { CounterOffer } from './../../../../api/models/counter-offer';
import { Notification } from './../../../../api/models/notification';
import { OfferService } from './../../../../services/offer.service';
import { CustomService } from './../../../../services/custom.service';
import { Offer } from './../../../../api/models/offer';
import { NavParams, ViewController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer-result',
  templateUrl: './offer-result.component.html'
})
export class OfferResultComponent implements OnInit {

  is_owner: boolean;
  is_load_success: boolean = false;
  notify: Notification;
  cOffer: CounterOffer;
  cOfferGuid: number;
  offer: Offer;
  constructor(private navParams: NavParams, private viewCtrl: ViewController, private customService: CustomService, private offerService: OfferService) {
    this.offer = this.navParams.get('offer');
    this.notify = this.navParams.get('notify');
    this.cOfferGuid = this.navParams.get('cOfferGuid');
    this.is_owner = this.customService.user_current.guid == this.offer.owner.guid;
    console.log(this.cOfferGuid);

  }

  ngOnInit() {
    switch (this.offer.offer_type) {
      case 'normal':
      case 'giveaway':
        this.is_load_success = true;
        break;
      case 'random':
        this.offerService.getCounterOffer(this.cOfferGuid).subscribe(data => {
          if (data.status != 'false') {
            this.cOffer = data;
            console.log(this.cOffer);
          }

        })
        break;
    }


  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
