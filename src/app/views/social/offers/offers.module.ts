import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { OffersComponent } from './offers.component';
import { OffersMyselfComponent } from './offers-myself/offers-myself.component';
import { OffersPendingComponent } from './offers-pending/offers-pending.component';
import { OffersSearchComponent } from './offers-search/offers-search.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule
  ],
  declarations: [
    OffersComponent,
    OffersMyselfComponent,
    OffersPendingComponent,
    OffersSearchComponent
  ],
  entryComponents: [
    OffersComponent,
    OffersMyselfComponent,
    OffersPendingComponent,
    OffersSearchComponent
  ]
})

export class OffersModule { }
