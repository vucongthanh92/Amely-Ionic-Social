import { DeliveryConfirmComponent } from './../../modules/delivery/delivery-confirm/delivery-confirm.component';
import { NavParams, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Payment_methods } from '../../api/models';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html'
})
export class PaymentMethodComponent implements OnInit {
  public payment_selected: Payment_methods;
  payment_methods: Array<Payment_methods>;

  constructor(private navParams: NavParams,private nav:NavController) {
    this.payment_methods = (<any>Object).values(this.navParams.get("paymentMethods"));
  }

  ngOnInit() {
  }

  changePage(){
    console.log(this.payment_selected);
    this.nav.push(DeliveryConfirmComponent, { payment_selected: this.payment_selected })
  }
}
