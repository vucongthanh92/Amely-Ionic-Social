import { Component, OnInit } from '@angular/core';
import { NavParams, App, NavController } from 'ionic-angular';
import { WalletsService } from '../../../services/wallets.service';
import { CustomService } from '../../../services/custom.service';
@Component({
  selector: 'app-deposit-confirm',
  templateUrl: './deposit-confirm.component.html'
})
export class DepositConfirmComponent implements OnInit {
  paymentMethod;
  amount;
  paymentOption;
  constructor(private navParams: NavParams) {
    this.paymentMethod = this.navParams.get('paymentMethod');
    this.amount = this.navParams.get('amount');
    this.paymentOption = this.navParams.get('paymentOption');
    console.log(this.paymentMethod);
    console.log(this.amount);
    console.log(this.paymentOption);
    
  }
  ngOnInit() {

  }


}
