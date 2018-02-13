import { User } from './../api/models/user';
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

  addFriend(from_guid, to_guid, invitation_type) {
    return this.api.createInvitation({ from_guid: from_guid, to_guid: to_guid, invitation_type: invitation_type });
  }

  changePassword(old_password, new_password, confirm_password) {
    return this.api.change_password({ old_password: old_password, new_password: new_password, confirm_password: confirm_password });
  }

  changePhoneNumber(new_phone) {
    return this.api.change_phone({ new_phone: new_phone });
  }
}
