import { Component, OnInit, ViewChild } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
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
