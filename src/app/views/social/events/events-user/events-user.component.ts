import { EventComponent } from './../../../../components/event/event.component';
import { User } from './../../../../api/models/user';
import { Event } from './../../../../api/models/event';
import { EventsService } from './../../../../services/events.service';
import { Component, OnInit } from '@angular/core';
import { App } from 'ionic-angular';

@Component({
  selector: 'app-events-user',
  templateUrl: './events-user.component.html'
})
export class EventsUserComponent implements OnInit {
  public events: Array<Event>;
  public users: Array<User>;
  constructor(
    private app: App,
    private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.getEvents(0, 9999, 'member').subscribe(data => {
      if (data.events instanceof Array) {
        this.events = data.events;
      }
      this.users = data.users;
    })
  }

  getDateCreate(time: number) {
    return new Date(time * 1000);
  }

  getFullname(guid: number) {
    return this.users[guid].fullname;
  }

  goToPage() {
    this.app.getRootNav().push(EventComponent);
  }
}
