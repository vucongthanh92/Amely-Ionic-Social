import { User } from './../../../../api/models/user';
import { Event } from './../../../../api/models/event';
import { EventsService } from './../../../../services/events.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-history',
  templateUrl: './events-history.component.html'
})
export class EventsHistoryComponent implements OnInit {
  public events: Array<Event>;
  public users: Array<User>;
  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.getEvents(0, 9999, 'history').subscribe(data => {
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
}
