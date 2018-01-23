import { Injectable } from '@angular/core';
import { ApiService } from '../../api/services/api.service';

@Injectable()
export class SocialService {

  constructor(private api: ApiService) {
    
  }

  getFeeds(offset) {
    return this.api.getFeeds({ "feeds_type":"home","owner_guid": null,"offset": offset,"limit": "10" }).pipe();
  }
}
