import { EventsHistoryComponent } from './events-history/events-history.component';
import { EventsUserComponent } from './events-user/events-user.component';
import { EventsGuestComponent } from './events-guest/events-guest.component';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { CreateEventComponent } from '../../../components/create-event/create-event.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {
  eventsTab = 'user';
  userPage = true;
  guestPage = false;
  historyPage = false;
  
  tab1Root = EventsUserComponent;
  tab2Root = EventsGuestComponent;
  tab3Root = EventsHistoryComponent;
  
  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }

  goToPage(value) {
    switch (value) {
      case 'user':
        this.userPage = true;
        this.guestPage = false;
        this.historyPage = false;
        break;
      case 'guest':
        this.userPage = false;
        this.guestPage = true;
        this.historyPage = false;
        break;
      case 'history':
        this.userPage = false;
        this.guestPage = false;
        this.historyPage = true;
        break;
      case 'create-event':
        this.appCtrl.getRootNav().push(CreateEventComponent);
      default:
        break;
    }
  }
}
