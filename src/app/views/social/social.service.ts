import { Injectable } from '@angular/core';
import { ApiService } from '../../api/services/api.service';

@Injectable()
export class SocialService {

  constructor(private api: ApiService) {
    
  }

  getFeeds(feeds_type, owner_guid, offset) {
    return this.api.getFeeds({ "feeds_type": feeds_type, "owner_guid": owner_guid, "offset": offset, "limit": "10" }).pipe();
  }
}
