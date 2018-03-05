import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositPaymentMethodComponent } from './deposit-payment-method/deposit-payment-method.component';
import { DepositPaymentOptionComponent } from './deposit-payment-option/deposit-payment-option.component';
import { DepositConfirmComponent } from './deposit-confirm/deposit-confirm.component';
import { IonicModule } from 'ionic-angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [DepositPaymentMethodComponent, DepositPaymentOptionComponent, DepositConfirmComponent],
  entryComponents: [DepositPaymentMethodComponent, DepositPaymentOptionComponent, DepositConfirmComponent]
})
export class DepositModule { }
