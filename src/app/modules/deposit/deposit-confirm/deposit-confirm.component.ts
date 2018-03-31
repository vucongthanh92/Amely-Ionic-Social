import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

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
