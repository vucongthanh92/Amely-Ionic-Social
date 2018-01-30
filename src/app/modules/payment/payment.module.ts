import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentItemsComponent } from './payment-items/payment-items.component';
import { PaymentCustomerInfoComponent } from './payment-customer-info/payment-customer-info.component';
import { PaymentShipingMethodComponent } from './payment-shiping-method/payment-shiping-method.component';
import { PaymentReceiverInfoComponent } from './payment-receiver-info/payment-receiver-info.component';
import { PaymentPaymentMethodComponent } from './payment-payment-method/payment-payment-method.component';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';
import { PaymentPaymentOptionsComponent } from './payment-payment-options/payment-payment-options.component';
import { PaymentOptionsPaypalComponent } from './payment-payment-options/payment-options-paypal/payment-options-paypal.component';
import { PaymentOptionsWalletComponent } from './payment-payment-options/payment-options-wallet/payment-options-wallet.component';
import { PaymentOptionsVisaComponent } from './payment-payment-options/payment-options-visa/payment-options-visa.component';
import { PaymentOptionsAtmComponent } from './payment-payment-options/payment-options-atm/payment-options-atm.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PaymentItemsComponent, PaymentCustomerInfoComponent, PaymentShipingMethodComponent, PaymentReceiverInfoComponent    , PaymentPaymentMethodComponent, PaymentConfirmComponent, PaymentPaymentOptionsComponent, PaymentOptionsPaypalComponent, PaymentOptionsWalletComponent, PaymentOptionsVisaComponent, PaymentOptionsAtmComponent]
})
export class PaymentModule { }
