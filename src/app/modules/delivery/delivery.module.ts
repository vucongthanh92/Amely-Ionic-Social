import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryItemComponent } from './delivery-item/delivery-item.component';
import { DeliveryInfoComponent } from './delivery-info/delivery-info.component';
import { DeliveryConfirmComponent } from './delivery-confirm/delivery-confirm.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [DeliveryItemComponent, DeliveryInfoComponent, DeliveryConfirmComponent],
  entryComponents: [DeliveryItemComponent, DeliveryInfoComponent, DeliveryConfirmComponent]
})
export class DeliveryModule { }
