import { Injectable } from '@angular/core';
import { ApiService } from './../api/services/api.service';

@Injectable()
export class UserService {

  constructor(private api: ApiService) { }

  login(username, password) {
    return this.api.login({ username: username, password: password });
  }
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

  findUser(mobile) {
    return this.api.searchs({ mobile: mobile, text_search: null, category: null, type: null });
  }

  updateProfile(firstname: string, lastname: string, email: string, gender: string, birthdate: string, usercurrency: string,
    friends_hidden: string, mobile_hidden: string, birthdate_hidden: string, province: string, district: string, ward: string, address: string) {
    return this.api.updateProfile({
      firstname: firstname, lastname: lastname, email: email, gender: gender, birthdate: birthdate,
      usercurrency: usercurrency, friends_hidden: friends_hidden, mobile_hidden: mobile_hidden, birthdate_hidden: birthdate_hidden, province: province,
      district: district, ward: ward, address: address
    });
  }
  register(username: string, firstname: string, lastname: string, email: string, email_re: string, password: string, password_re: string, mobilelogin: string, birthdate: string, gender: string) {
    return this.api.register({
      username: username, firstname: firstname, lastname: lastname, email: email, email_re: email_re, password: password, password_re:
        password_re, mobilelogin: mobilelogin, birthdate: birthdate, gender: gender
    })
  }

  activeUser(username: string, password: string, mobilelogin: string, code: string) {
    return this.api.activeUser({ username: username, password: password, mobilelogin: mobilelogin, code: code });
  }

  blockUser(guid) {
    return this.api.createBlock({ user_guid: guid })
  }

  blockList() {
    return this.api.getBlocks();
  }
  unblock(guid) {
    return this.api.deleteBlock(guid);
  }

  updateContact(contacts: string[]) {
    return this.api.contact_update({ mobiles: contacts })
  }

  deleteFriend(guid) {
    return this.api.deleteFriend(guid);
  }
}
