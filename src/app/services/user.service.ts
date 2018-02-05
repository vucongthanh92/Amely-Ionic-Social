import { Injectable } from '@angular/core';
import { ApiService } from './../api/services/api.service';

@Injectable()
export class UserService {

  constructor(private api: ApiService) { }


  getUser(username, guid) {
    return this.api.getProfile({ "username": username, "guid": guid }).pipe();
  }

  getFriends(user_guid) {
    return this.api.getFriends(user_guid);
  }

  getAlbum() {
    return this.api.getAlbums();
  }
}
