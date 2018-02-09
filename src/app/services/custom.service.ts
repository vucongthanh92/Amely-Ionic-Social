import { SearchComponent } from './../components/search/search.component';
import { ApiService } from './../api/services/api.service';
import { User } from './../api/models/user';
import { Injectable } from '@angular/core';
import { ToastController, NavController } from 'ionic-angular';

@Injectable()
export class CustomService {

  cart = [];
  user_current: User;

  private currencies: Array<{ isoCode: string, displayName: string, rightSymbol: string, leftSymbol: string, decimals: number, decPoints: string, thousandSeparator: string }>;

  constructor(public api: ApiService, private toastCtrl: ToastController) {
    this.currencies = [
      { isoCode: 'VND', displayName: 'VND', rightSymbol: '₫', leftSymbol: '', decimals: 0, decPoints: ',', thousandSeparator: '.' },
      { isoCode: 'USD', displayName: 'USD', rightSymbol: '', leftSymbol: '$', decimals: 2, decPoints: '.', thousandSeparator: ',' }
    ];
  }

  formatCurrency(amount: string, currency: string) {
    let result: string;
    switch (currency) {
      case 'VND':
        result = (+amount).toLocaleString('vi-VN', { style: 'decimal', currency: 'VND' }) + ' ₫';
        break;
      case 'USD':
        result = (+amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        break;
      default:
        result = amount + ' ' + currency;
        break;
    }
    return result;
  }

  like(type: string, guid: number) {
    return this.api.createLike({ type: type, guid: guid });
  }

  unlike(type: string, guid: number) {
    return this.api.deleteLike({ type: type, guid: guid });
  }

  toastMessage(message: string, position: string, duration: number) {
    const toast = this.toastCtrl.create({
      message: message,
      position: position,
      duration: duration
    });
    toast.present();
  }

  goToPageSearch(content: string, nav: NavController) {
    nav.push(SearchComponent, { param: content, service: this })
  }


}
