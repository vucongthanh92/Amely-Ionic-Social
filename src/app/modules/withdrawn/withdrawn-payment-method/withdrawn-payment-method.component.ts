import { WithdrawnOptionComponent } from './../withdrawn-option/withdrawn-option.component';
import { CustomService } from './../../../services/custom.service';
import { WalletsService } from './../../../services/wallets.service';
import { Wallet } from './../../../api/models/wallet';
import { Component, OnInit } from '@angular/core';
import { NavParams, App, NavController } from 'ionic-angular';

@Component({
  selector: 'app-withdrawn-payment-method',
  templateUrl: './withdrawn-payment-method.component.html'
})
export class WithdrawnPaymentMethodComponent implements OnInit {
  private wallet: Wallet;
  payment_methods = [];
  payment_selected: any;
  private limit: any;
  amount: string;
  private min: number;
  private max: number;
  constructor(private navParams: NavParams, private nav: NavController, private walletService: WalletsService, private customService: CustomService) {
    this.wallet = this.navParams.get('wallet');
  }

  showLimitAmount(isMin: boolean) {

    if (this.limit)
      switch (this.customService.user_current.usercurrency) {
        case 'USD':
          this.min = this.limit.min.USD;
          this.max = this.limit.max.USD;
          if (isMin) return this.customService.formatCurrency(this.min + '', 'USD');
          else return this.customService.formatCurrency(this.max + '', 'USD');
        default:
          this.min = this.limit.min.VND;
          this.max = this.limit.max.VND;
          if (isMin) return this.customService.formatCurrency(this.min + '', 'VND');
          else return this.customService.formatCurrency(this.max + '', 'VND');
      }

  }

  ngOnInit() {
    this.walletService.confirmWithdrawn().subscribe(data => {
      this.payment_methods = (<any>Object).values(data.payment_method);
      this.limit = data.limit;
    })
  }
  changePage() {
    if (!this.payment_selected) {
      this.customService.toastMessage('Chưa chọn phương thức thanh toán', 'bottom', 2000)
    } else if (!this.amount) {
      this.customService.toastMessage('Số tiền rút không hợp lệ', 'bottom', 2000)
    } else {
      if (+this.amount < this.min || +this.amount > this.max) {
        this.customService.toastMessage('Số tiền rút không hợp lệ', 'bottom', 2000)
      } else {
        this.nav.push(WithdrawnOptionComponent, { paymentMethod: this.payment_selected, amount: +this.amount })
      }
    }
  }
}
