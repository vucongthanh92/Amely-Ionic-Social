import { User } from './../api/models/user';
import { Camera } from '@ionic-native/camera';
import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class PhotosService {

  Picture;
  base64Image: any;
  userCurrent: User;

  constructor(
    public camera: Camera,
    public storage: AngularFireStorage,
    public firebaseApp: FirebaseApp,
  ) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
   }

  takePicture() {
    this.camera.getPicture({
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true
    }).then((imageData) => {
      const filePath = "chat/"+this.userCurrent.username + "" + Date.now() + "" + ((Math.random() * 1000000) + 1) +".jpg";
      this.storage.ref(filePath).putString(imageData, 'base64', { contentType: 'image/jpg' }).then( task => {
      });
    });
  }

  dataURItoBlob(dataURI) {
    // code adapted from: http://stackoverflow.com/questions/33486352/cant-upload-image-to-aws-s3-from-ionic-camera
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  };

  selectFromGallery() {
    var options = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      correctOrientation: true,
      allowEdit: true
    };
    this.camera.getPicture(options).then((imageData) => {
      const filePath = "chat/" + this.userCurrent.username + "" + Date.now() + "" + ((Math.random() * 1000000) + 1) + ".jpg";
      this.storage.ref(filePath).putString(imageData, 'base64', { contentType: 'image/jpg' }).then(task => {
      });
    }, (err) => {
      // Handle error
    });
  }
}
