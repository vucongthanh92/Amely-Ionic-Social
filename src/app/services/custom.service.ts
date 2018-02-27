import { SearchComponent } from './../components/search/search.component';
import { ApiService } from './../api/services/api.service';
import { User } from './../api/models/user';
import { Injectable } from '@angular/core';
import { ToastController, NavController } from 'ionic-angular';

@Injectable()
export class CustomService {

  cart = [];
  user_current: User;
  mood_local: any;
  public url_site = "http://helloqua.com/";
  friends: Array<User>;

  private currencies: Array<{ isoCode: string, displayName: string, rightSymbol: string, leftSymbol: string, decimals: number, decPoints: string, thousandSeparator: string }>;

  constructor(
    private api: ApiService,
    private toastCtrl: ToastController
  ) {
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
    // nav.push(SearchComponent, { param: content, service: this })
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    const secNum = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor((secNum - (hours * 3600)) / 60);
    const seconds = secNum - (hours * 3600) - (minutes * 60);
    let hoursString = '';
    let minutesString = '';
    let secondsString = '';
    hoursString = (hours < 10) ? '0' + hours : hours.toString();
    minutesString = (minutes < 10) ? '0' + minutes : minutes.toString();
    secondsString = (seconds < 10) ? '0' + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  getCurrentTime() {
    return this.api.getServices();
  }

  invite(from_guid: number, to_guid: number[], invitation_type: string) {
    return this.api.createInvitation({ from_guid: from_guid, to_guid: to_guid, invitation_type: invitation_type });
  }

  getTransactions(type: string) {
    return this.api.getTransactions(type);
  }
}
