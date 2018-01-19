import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { EventsComponent } from './events.component';
import { EventsUserComponent } from './events-user/events-user.component';
import { EventsGuestComponent } from './events-guest/events-guest.component';
import { EventsHistoryComponent } from './events-history/events-history.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    EventsComponent,
    EventsUserComponent,
    EventsGuestComponent,
    EventsHistoryComponent
  ],
  entryComponents: [
    EventsComponent,
    EventsUserComponent,
    EventsGuestComponent,
    EventsHistoryComponent
  ]
})
export class EventsModule { }
