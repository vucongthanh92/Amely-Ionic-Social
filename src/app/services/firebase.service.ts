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
    this.afDatabase.database.ref('/users/' + username).update({ findable_by: value });
  }

  updateProfile(username: string, yob: string, gender: string) {
    this.afDatabase.database.ref('/users/' + username).update({ yob: yob, gender: gender });
  }

  getMessages(key_chat) {
    let path = "/shared/messages/" + key_chat;
    return this.afDatabase.list(path);
  }

  findUser(username: string) {
    let path = "/users/" + username + "/";
    return this.afDatabase.list(path);
  }

  findKeyChat(userChat, userCurrent) {
    let path = "/users/" + userChat + "/chat/individual/" + userCurrent + "/";
    return this.afDatabase.database.ref(path);
  }

  insertIndividual(userChat, userCurrent, individual) {
    let path = "/users/" + userChat + "/chat/individual/" ;
    return this.afDatabase.list(path).set(userCurrent, individual);
  }


  getLastMessage(key_chat) {
    let path = "/shared/messages/" + key_chat;
    return this.afDatabase.list(path).query.orderByChild('time').limitToLast(1);
  }

  createMessage(message, key_chat) {
    let path = "/shared/messages/" + key_chat;
    return this.afDatabase.list(path).push(message);
  }

  updateLastRead(owner_from, owner_to, owner_to_type) {
    let path = "/users/" + owner_from + "/chat/" + owner_to_type + "/" + owner_to;
    this.afDatabase.database.ref(path).update({ last_read: Date.now() });
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

  uploadImage(owner_from, img_base64, extension, content_type, isUserUpload) {
    let filePath;
    if (!isUserUpload) {
      filePath = "chat/" + owner_from + "" + Date.now() + "" + ((Math.random() * 1000000) + 1) + extension;
    } else {
      filePath = "users_upload/" + owner_from + "" + Date.now() + "" + ((Math.random() * 1000000) + 1) + extension;
    }
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

  syncProfileFirebase(yob: string, gender: string, moodId: string, username: string) {
    let path = "/users/" + username;
    let info = { gender: gender, mood: moodId, yob: yob };
    this.afDatabase.database.ref(path).update(info);
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

  deleteOffer(guid) {
    this.afDatabase.object('/offers/' + guid).remove();
  }

  getOrder(shopguid, userGuid, guid) {
    return this.afDatabase.list('/orders/' + shopguid + "/" + userGuid + "/" + guid);
  }

  deleteQRCode(qr) {
    this.afDatabase.object('/redeem/' + qr).remove();
  }

  updateViewedNotify(id, username) {
    this.afDatabase.database.ref('/notifications/' + username + "/" + id).update({ viewed: true });
  }

  createKeyFirebase() {
    return this.afDatabase.database.ref().push().key;
  }
}
