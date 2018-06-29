import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryDeliveryComponent } from './history-delivery/history-delivery.component';
import { IonicModule } from 'ionic-angular';
import { HistoryDeliveryDetailComponent } from './history-delivery-detail/history-delivery-detail.component';
import { HistoryOrderDetailComponent } from './history-order-detail/history-order-detail.component';
import { HistoryOrderComponent } from './history-order/history-order.component';
import { HistoryOfferComponent } from './history-offer/history-offer.component';
import { HistoryOfferDetailComponent } from './history-offer-detail/history-offer-detail.component';
import { HistoryDeliveryFromStorageComponent } from './history-delivery-from-storage/history-delivery-from-storage.component';
import { HistoryRedeemComponent } from './history-redeem/history-redeem.component';
import { HistoryRedeemDetailComponent } from './history-redeem-detail/history-redeem-detail.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [HistoryDeliveryComponent, HistoryDeliveryDetailComponent, HistoryOrderDetailComponent,
    HistoryOrderComponent, HistoryOfferComponent, HistoryOfferDetailComponent, HistoryDeliveryFromStorageComponent, HistoryRedeemComponent, HistoryRedeemDetailComponent],
  entryComponents: [HistoryDeliveryComponent, HistoryDeliveryDetailComponent, HistoryOrderDetailComponent,
    HistoryOrderComponent, HistoryOfferComponent, HistoryOfferDetailComponent, HistoryDeliveryFromStorageComponent, HistoryRedeemComponent, HistoryRedeemDetailComponent]
})
export class HistoryModule { }
