import { Camera } from '@ionic-native/camera';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class MessagesService {

  userCurrent: any;
  individualList: any;
  message: { from: string, status: string, text: any, time: number };

  constructor(
    public storage: AngularFireStorage,
    public camera: Camera,
    public afDatabase: AngularFireDatabase,
    public userService: UserService
  ) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
   }

  getUsersChat() {
    let path = "/users/" + this.userCurrent.username + "/chat/";
    return this.afDatabase.list(path + "individual").query.orderByChild('last_read').startAt(1);
  }

  getGroupsChat() {
    let path = "/users/" + this.userCurrent.username + "/chat/";
    return this.afDatabase.list(path + "group");
  }

  getMessages(keyChat) {
    let path = "/shared/messages/" + keyChat ;
    return this.afDatabase.list(path);
  }

  getLastMessage(keyChat) {
    let path = "/shared/messages/" + keyChat;
    return this.afDatabase.list(path).query.orderByChild('time').limitToLast(1);
  }

  sendMessage(message, keyChat) {
    let path = "/shared/messages/" + keyChat;
    return this.afDatabase.list(path).push(message);
  }

  getGift(subjectId, username) {
    let path = "/notifications/" + username;
    return this.afDatabase.list(path).query.orderByChild('subject_guid').equalTo(subjectId);
  }

  selectFromGallery(keyChat) {
    var options = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL
    };
    this.camera.getPicture(options).then((imageData) => {
      const filePath = "chat/" + this.userCurrent.username + "" + Date.now() + "" + ((Math.random() * 1000000) + 1) + ".jpg";
      this.storage.ref(filePath).putString(imageData, 'base64', { contentType: 'image/jpg' }).then(task => {
        let path = "/shared/messages/" + keyChat;
        let attachment = { media_type: "image", url: task.downloadURL };
        let message = { from: this.userCurrent.username, status: "Đã gửi", text: "", time: Date.now(), attachment: attachment };
        this.afDatabase.list(path).push(message);
      });
    }, (err) => {
      // Handle error
    });
  }

  takePicture(keyChat) {
    this.camera.getPicture({
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((imageData) => {
      let captureDataUrl = 'data:image/jpeg;base64,' + imageData;
      const filePath = "chat/" + this.userCurrent.username + "" + Date.now() + "" + ((Math.random() * 1000000) + 1) + ".jpg";
      this.storage.ref(filePath).putString(imageData, 'base64', { contentType: 'image/jpg' }).then(task => {
        let path = "/shared/messages/" + keyChat;
        let attachment = { media_type: "image", url: task.downloadURL};
        let message = { from: this.userCurrent.username, status: "Đã gửi", text: "", time: Date.now(), attachment: attachment };
        this.afDatabase.list(path).push(message);
      });
    });
  }
}
