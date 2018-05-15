import { NavController } from 'ionic-angular/navigation/nav-controller';
import { CustomService } from './../../../services/custom.service';
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
  constructor(private offerService: OfferService, private navParams: NavParams, private customService: CustomService, private nav: NavController) {
    this.trans = this.navParams.get('transaction')
  }

  ngOnInit() {
    this.loadData(5)
  }

  loadData(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      this.nav.pop();
      return;
    }
    this.offerService.getOffer(this.trans.related_guid).subscribe(data => {
      this.offer = data;
      console.log(this.offer);
    }, err => this.loadData(--retry))
  }

  dismiss() {
    this.nav.pop();
  }
}
