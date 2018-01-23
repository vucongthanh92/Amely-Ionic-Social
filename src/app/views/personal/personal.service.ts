import { Injectable } from '@angular/core';
import { ApiService } from '../../api/services/api.service';

@Injectable()
export class PersonalService {

  constructor(
    private api: ApiService
  ) { }

  getFriends(user_guid) {
    return this.api.getFriends(user_guid);
  }

}
