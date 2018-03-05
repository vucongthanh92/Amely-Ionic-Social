import { Gift } from './../../../api/models/gift';
import { Transaction } from './../../../api/models/transaction';
import { GiftsService } from './../../../services/gifts.service';
import { Component, OnInit } from '@angular/core';
import { CustomService } from '../../../services/custom.service';
import { NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-gift-history',
  templateUrl: './gift-history.component.html'
})
export class GiftHistoryComponent implements OnInit {

  transaction: Transaction;
  gift: Gift;
  constructor(private giftService: GiftsService, private customService: CustomService, private navParams: NavParams, public sanitizer: DomSanitizer) {
    this.transaction = this.navParams.get('trans')
  }

  ngOnInit() {
    this.transaction = this.navParams.get('trans');
    console.log(this.transaction);

    this.giftService.getGift(this.transaction.related_guid).subscribe(data => {
      this.gift = data;
      console.log(this.gift);

    })
  }

  convertDate(time) {
    return new Date(time * 1000);
  }

  convertCurrency(amount, currency) {
    return this.customService.formatCurrency(amount, currency)
  }
}
