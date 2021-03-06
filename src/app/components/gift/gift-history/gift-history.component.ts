import { Gift } from './../../../api/models/gift';
import { Transaction } from './../../../api/models/transaction';
import { GiftsService } from './../../../services/gifts.service';
import { Component, OnInit } from '@angular/core';
import { CustomService } from '../../../services/custom.service';
import { NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-gift-history',
  templateUrl: './gift-history.component.html'
})
export class GiftHistoryComponent implements OnInit {
  transaction: Transaction;
  gift: Gift;

  constructor(
    private giftService: GiftsService, 
    private customService: CustomService, 
    private navParams: NavParams, 
    public sanitizer: DomSanitizer,
    public nav: NavController
  ) {
    this.transaction = this.navParams.get('trans');
    this.loadData(5);
  }

  ngOnInit() {
    this.transaction = this.navParams.get('trans');
  }

  loadData(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.giftService.getGift(this.transaction.related_guid).subscribe(
      data => {
        this.gift = data;
      },
      err => {
        this.loadData(--retry)
      })
  }
  convertDate(time) {
    return new Date(time * 1000);
  }

  convertCurrency(amount, currency) {
    return this.customService.formatCurrency(amount, currency)
  }

  dismiss() {
    this.nav.pop();
  }
}
