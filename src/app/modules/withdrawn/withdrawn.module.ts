import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawnPaymentMethodComponent } from './withdrawn-payment-method/withdrawn-payment-method.component';
import { WithdrawnOptionComponent } from './withdrawn-option/withdrawn-option.component';
import { IonicModule } from 'ionic-angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
  ],
  declarations: [WithdrawnPaymentMethodComponent, WithdrawnOptionComponent],
  entryComponents: [WithdrawnPaymentMethodComponent, WithdrawnOptionComponent]
})
export class WithdrawnModule { }
