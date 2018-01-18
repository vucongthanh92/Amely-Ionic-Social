import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersMyselfComponent } from './offers/offers-myself/offers-myself.component';
import { OffersPendingComponent } from './offers/offers-pending/offers-pending.component';
import { OffersSearchComponent } from './offers/offers-search/offers-search.component';
import { EventsUserComponent } from './events/events-user/events-user.component';
import { EventsGuestComponent } from './events/events-guest/events-guest.component';
import { EventsHistoryComponent } from './events/events-history/events-history.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OffersMyselfComponent, OffersPendingComponent, OffersSearchComponent, EventsUserComponent, EventsGuestComponent, EventsHistoryComponent]
})

export class SocialModule { }
