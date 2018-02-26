import { Injectable } from '@angular/core';
import { ApiService } from '../api/services/api.service';

@Injectable()
export class EventsService {

  constructor(private apiService: ApiService) { }

  getEvents(offset: number, limit: number, event_type: string) {
    return this.apiService.getEvents({ offset: offset, limit: limit, event_type: event_type });
  }
  createEvent(template: string, title: string, start_date: string, end_date: string,
    country: string, location: string, description: string, has_inventory: string, status: string,
    event_type: string, owner_guid: number, members: string[], invites: string[]) {

    return this.apiService.createEvent({template : template, title : title, start_date : start_date,
      end_date: end_date, location: location, country : country, description : description,
      has_inventory : has_inventory, status : status, event_type : event_type, owner_guid : owner_guid,
      members : members, invites : invites});
  }
}
