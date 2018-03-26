import { CustomService } from './../../../../services/custom.service';
import { EventComponent } from './../../../../components/event/event.component';
import { User } from './../../../../api/models/user';
import { Event } from './../../../../api/models/event';
import { EventsService } from './../../../../services/events.service';
import { Component, OnInit } from '@angular/core';
import { App } from 'ionic-angular';

@Component({
  selector: 'app-events-guest',
  templateUrl: './events-guest.component.html'
})
export class EventsGuestComponent implements OnInit {
  public events: Array<Event>;
  public users: Array<User>;
  constructor(private eventsService: EventsService, private app: App, private customService: CustomService) { }

  ngOnInit() {
    this.loadData(5);
  }

  loadData(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.eventsService.getEvents(0, 9999, 'guest').subscribe(data => {
      if (data.events instanceof Array) {
        this.events = data.events;
      }
      this.users = data.users;
    }, err => this.loadData(--retry))
  }

  getDateCreate(time: number) {
    return new Date(time * 1000);
  }

  getFullname(guid: number) {
    return this.users[guid].fullname;
  }
  goToPage(event_guid) {
    this.app.getRootNav().push(EventComponent, { is_user: false, event_guid: event_guid });
  }
}
