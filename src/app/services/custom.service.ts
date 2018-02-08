import { User } from './../api/models/user';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomService {

  cart = [];
  user_current: User;

  private currencies: Array<{ isoCode: string, displayName: string, rightSymbol: string, leftSymbol: string, decimals: number, decPoints: string, thousandSeparator: string }>;

  constructor() {
    this.currencies = [
      { isoCode: 'VND', displayName: 'VND', rightSymbol: '₫', leftSymbol: '', decimals: 0, decPoints: ',', thousandSeparator: '.' },
      { isoCode: 'USD', displayName: 'USD', rightSymbol: '', leftSymbol: '$', decimals: 2, decPoints: '.', thousandSeparator: ',' }
    ];
  }

  formatCurrency(amount: string, currency: string) {
    let result :string;
    switch (currency) {
      case 'VND':
        result = (+amount).toLocaleString('vi-VN', { style: 'decimal', currency: 'VND' }) +' ₫';
        break;
      case 'USD':
        result = (+amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        break;
      default:
        result= amount + ' ' + currency;
        break;
    }
    return result;
  }

}
