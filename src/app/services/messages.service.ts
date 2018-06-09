import { CustomService } from './custom.service';
import { FirebaseService } from './firebase.service';
import { Camera } from '@ionic-native/camera';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { GiftsService } from './gifts.service';

@Injectable()
export class MessagesService {

  individualList: any;
  message: { from: string, status: string, text: any, time: number };

  constructor(
    private customService: CustomService,
    private fbService: FirebaseService,
    public giftsService: GiftsService,
    public storage: AngularFireStorage,
    public camera: Camera,
    public afDatabase: AngularFireDatabase,
    public userService: UserService
  ) {
  }


  generateKey() {
    return this.fbService.generateKey();
  }

  getKeyChat(owner_from, owner_to, owner_to_type) {
    return this.fbService.getKey(owner_from, owner_to, owner_to_type);
  }

  /**
   * 
   * @param owner_to_type group - individual
   * @param owner_from 
   * @param owner_to group_id - username
   * @param obj 
   */
  createKeyChat(owner_to_type, owner_from, owner_to, obj) {
    return this.fbService.createKey(owner_to_type, owner_from, owner_to, obj);
  }

  getListChat(owner_from, owner_to_type) {
    return this.fbService.getListByOwner(owner_from, owner_to_type);
  }

  // getUsersChat() {
  //   let path = "/users/" + this.customService.user_current.username + "/chat/";
  //   let owner_from = this.customService.user_current.username;
  //   let owner_to_type = "individual";
  //   return this.fbService.getListByOwner(owner_from, owner_to_type);
  // }

  // getGroupsChat() {
  //   let path = "/users/" + this.customService.user_current.username + "/chat/";
  //   return this.afDatabase.list(path + "group").query.orderByChild('last_read').startAt(1);
  // }

  getMessages(key_chat) {
    return this.fbService.getMessages(key_chat);
  }

  getLastMessage(key_chat) {
    return this.fbService.getLastMessage(key_chat);
  }

  sendMessage(message, key_chat) {
    return this.fbService.createMessage(message, key_chat);
  }

  updateLastRead(owner_from, owner_to, owner_to_type) {
    return this.fbService.updateLastRead(owner_from, owner_to, owner_to_type);
  }

  getGift(subject_id, username) {
    return this.fbService.getGiftBySubject(subject_id, username);
  }

  createNotification(username, obj) {
    return this.fbService.createNotification(username, obj);
  }

  selectFromGallery(key_chat) {
    var options = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL
    };
    this.camera.getPicture(options).then((imageData) => {
      let owner_from = this.customService.user_current.username;
      let extension = ".jpg";
      let content_type = "image/jpg";
      this.fbService.uploadImage(owner_from, imageData, extension, content_type).then(task => {
        let attachment = { media_type: "image", url: task.downloadURL };
        let message = { from: owner_from, status: "Đã gửi", text: "", time: Date.now(), attachment: attachment };
        this.fbService.createMessage(message, key_chat);
        // this.afDatabase.list(path).push(message);
      });
    }, (err) => {
      // Handle error
    });
  }

  takePicture(key_chat) {
    this.camera.getPicture({
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((imageData) => {
      let owner_from = this.customService.user_current.username;
      let extension = ".jpg";
      let content_type = "image/jpg";
      this.fbService.uploadImage(owner_from, imageData, extension, content_type).then(task => {
        let attachment = { media_type: "image", url: task.downloadURL };
        let message = { from: owner_from, status: "Đã gửi", text: "", time: Date.now(), attachment: attachment };
        this.fbService.createMessage(message, key_chat);
      });
    });
  }

  acceptGift(username, gift_guid) {
    this.retryAcceptGift(5, gift_guid)
  }

  retryAcceptGift(retry, gift_guid) {
    if (retry == 0) {
      return;
    }
    this.giftsService.accept(gift_guid).subscribe(res => {
      if (res.status) {
        let owner_from = this.customService.user_current.username;
        let notification_type = "gift:accept";
        let status = "accept";
        let subject_guid = gift_guid;
        this.fbService.updateNotificationBySubject(owner_from, notification_type, status, subject_guid);
      }
    }, err => this.retryAcceptGift(--retry, gift_guid));
  }

  rejectGift(username, gift_guid) {
    this.retryRejectGift(5, gift_guid);
  }

  retryRejectGift(retry, gift_guid) {
    if (retry == 0) {
      return;
    }
    this.giftsService.reject(gift_guid).subscribe(res => {
      if (res.status) {
        let owner_from = this.customService.user_current.username;
        let notification_type = "gift:reject";
        let status = "reject";
        let subject_guid = gift_guid;
        this.fbService.updateNotificationBySubject(owner_from, notification_type, status, subject_guid);
      }
    }, err => this.retryRejectGift(--retry, gift_guid));
  }
}
