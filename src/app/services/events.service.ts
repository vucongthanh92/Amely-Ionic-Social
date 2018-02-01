import { Injectable } from '@angular/core';
import { ApiService } from '../api/services/api.service';

@Injectable()
export class EventsService {

  constructor(private apiService: ApiService) { }

  getEvents(offset: number, limit: number, event_type: string) {
    return this.apiService.getEvents({ offset: offset, limit: limit, event_type: event_type });
  }
}
