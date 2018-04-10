import { QuickPayShippingOptionComponent } from './../quick-pay-shipping-option/quick-pay-shipping-option.component';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuickPayConfirmComponent } from '../quick-pay-confirm/quick-pay-confirm.component';

@Component({
  selector: 'app-quick-pay-shipping-method',
  templateUrl: './quick-pay-shipping-method.component.html'
})
export class QuickPayShippingMethodComponent implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {
  }

  confirmBill() {
    this.nav.push(QuickPayConfirmComponent);
  }

  shipping() {
    this.nav.push(QuickPayShippingOptionComponent);
  }
}
