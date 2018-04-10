import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickPayListItemComponent } from './quick-pay-list-item/quick-pay-list-item.component';
import { IonicModule } from 'ionic-angular';
import { QuickPayRedeemComponent } from './quick-pay-redeem/quick-pay-redeem.component';
import { QuickPayMethodComponent } from './quick-pay-method/quick-pay-method.component';
import { QuickPayConfirmComponent } from './quick-pay-confirm/quick-pay-confirm.component';
import { QuickPayShippingMethodComponent } from './quick-pay-shipping-method/quick-pay-shipping-method.component';
import { QuickPayShippingOptionComponent } from './quick-pay-shipping-option/quick-pay-shipping-option.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [QuickPayListItemComponent, QuickPayRedeemComponent, QuickPayMethodComponent, QuickPayConfirmComponent,
     QuickPayShippingMethodComponent, QuickPayShippingOptionComponent],
  entryComponents: [QuickPayListItemComponent, QuickPayRedeemComponent, QuickPayMethodComponent, 
    QuickPayConfirmComponent, QuickPayShippingMethodComponent, QuickPayShippingOptionComponent]
})
export class QuickPayModule { }
