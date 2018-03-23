import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class FirebaseService {

  constructor(
    private storage: AngularFireStorage,
    private afDatabase: AngularFireDatabase,
  ) { }

  generateKey() {
    return this.afDatabase.list('/users/').push({}).key;
  }

  getListByOwner(owner_from, owner_to_type) {
    let path = "/users/" + owner_from + "/chat/" + owner_to_type;
    return this.afDatabase.list(path).query.orderByChild('last_read').startAt(1);
  }

  getKey(owner_from, owner_to, owner_to_type) {
    let path = "/users/" + owner_from + "/chat/" + owner_to_type + "/" + owner_to;
    return this.afDatabase.list(path);
  }

  createKey(owner_to_type, owner_from, owner_to, obj) {
    let path = "/users/" + owner_from + "/chat/" + owner_to_type;
    this.afDatabase.list(path).set(owner_to, obj);
  }

  updateFindableBy(username: string, value) {
    const path = '/users/' + username
    this.afDatabase.database.ref('/users/' + username).update({ findable_by: value });
  }

  getMessages(key_chat) {
    let path = "/shared/messages/" + key_chat;
    return this.afDatabase.list(path);
  }

  findUser(username: string) {
    let path = "/users/" + username + "/";
    return this.afDatabase.list(path);
  }

  getLastMessage(key_chat) {
    let path = "/shared/messages/" + key_chat;
    return this.afDatabase.list(path).query.orderByChild('time').limitToLast(1);
  }

  createMessage(message, key_chat) {
    let path = "/shared/messages/" + key_chat;
    return this.afDatabase.list(path).push(message);
  }

  getGiftBySubject(subject_id, username) {
    let path = "/notifications/" + username;
    return this.afDatabase.list(path).query.orderByChild('subject_guid').equalTo(subject_id);
  }

  createNotification(username, obj) {
    let path = "/notifications/" + username;
    return this.afDatabase.list(path).push(obj);
  }

  /**
   * @param owner_from 
   * @param img_base64
   * @param extension .jpg | .png 
   * @param content_type image/jpg | image/png
   */

  uploadImage(owner_from, img_base64, extension, content_type) {
    const filePath = "chat/" + owner_from + "" + Date.now() + "" + ((Math.random() * 1000000) + 1) + extension;
    return this.storage.ref(filePath).putString(img_base64, 'base64', { contentType: content_type });
  }

  /**
   * @param owner_from 
   * @param notification_type gift:accept | gift:reject | ...
   * @param status accept | reject | cancel
   * @param subject_guid 
   */

  updateNotificationBySubject(owner_from, notification_type, status, subject_guid) {
    let path = "/notifications/" + owner_from;
    let message = { notification_type: notification_type, status: status };
    let ref = this.afDatabase.list(path);
    ref.query.orderByChild("subject_guid").equalTo(subject_guid).once('child_added', snap => {
      return ref.update(snap.key, message);
    });
  }

  /**
   * @param owner_from 
   * @param owner_from_type users | offers | shops
   * @param geoHash
   * @param lat 
   * @param lng
   */

  createLocation(owner_from, owner_from_type, geoHash, lat, lng) {
    this.afDatabase.database.ref(owner_from_type + '/' + owner_from).update({ g: geoHash, l: [lat, lng] });
  }

  getNotify(owner: string) {
    let path = "/notifications/" + owner;
    return this.afDatabase.list(path);
  }
}
