import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentItemsComponent } from './payment-items/payment-items.component';
import { PaymentCustomerInfoComponent } from './payment-customer-info/payment-customer-info.component';
import { PaymentShipingMethodComponent } from './payment-shiping-method/payment-shiping-method.component';
import { PaymentReceiverInfoComponent } from './payment-receiver-info/payment-receiver-info.component';
import { PaymentPaymentMethodComponent } from './payment-payment-method/payment-payment-method.component';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PaymentItemsComponent, PaymentCustomerInfoComponent, PaymentShipingMethodComponent, PaymentReceiverInfoComponent    , PaymentPaymentMethodComponent, PaymentConfirmComponent]
})
export class PaymentModule { }
