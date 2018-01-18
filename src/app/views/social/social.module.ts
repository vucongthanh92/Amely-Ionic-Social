import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersMyselfComponent } from './offers/offers-myself/offers-myself.component';
import { OffersPendingComponent } from './offers/offers-pending/offers-pending.component';
import { OffersSearchComponent } from './offers/offers-search/offers-search.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OffersMyselfComponent, OffersPendingComponent, OffersSearchComponent]
})

export class SocialModule { }
