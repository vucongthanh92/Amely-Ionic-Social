import { Offer } from './../../../api/models/offer';
import { Transaction } from './../../../api/models/transaction';
import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../../services/offer.service';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'app-history-offer-detail',
  templateUrl: './history-offer-detail.component.html'
})
export class HistoryOfferDetailComponent implements OnInit {
  trans: Transaction;
  offer: Offer
  constructor(private offerService: OfferService, private navParams: NavParams) {
    this.trans = this.navParams.get('transaction')
  }

  ngOnInit() {
    this.offerService.getOffer(this.trans.related_guid).subscribe(data => {
      this.offer = data;
    })
  }

}
