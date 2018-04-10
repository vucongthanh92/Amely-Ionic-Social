import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'app-quick-pay-redeem',
  templateUrl: './quick-pay-redeem.component.html'
})
export class QuickPayRedeemComponent implements OnInit {
  public quantityRedeem: number = 5;
  constructor(private viewCtrl: ViewController) { }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submit() {

  }

  onMinus() {

  }
  onAdd() {

  }
}
