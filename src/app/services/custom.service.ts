import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';
import { SearchComponent } from './../components/search/search.component';
import { ApiService } from './../api/services/api.service';
import { User } from './../api/models/user';
import { Injectable } from '@angular/core';
import { ToastController, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { Notification } from '../api/models';
import { Camera } from '@ionic-native/camera';

@Injectable()
export class CustomService {

  cart = [];
  user_current: User;
  mood_local: any;
  public url_site = "http://helloqua.com/";
  friends: Array<User>;
  notifications: Array<Notification> = [];
  public url_qr = "http://helloqua.com/";
  private currencies: Array<{ isoCode: string, displayName: string, rightSymbol: string, leftSymbol: string, decimals: number, decPoints: string, thousandSeparator: string }>;

  constructor(
    private api: ApiService,
    private toastCtrl: ToastController
  ) {
    this.currencies = [
      { isoCode: 'VND', displayName: 'VND', rightSymbol: '₫', leftSymbol: '', decimals: 0, decPoints: ',', thousandSeparator: '.' },
      { isoCode: 'USD', displayName: 'USD', rightSymbol: '', leftSymbol: '$', decimals: 2, decPoints: '.', thousandSeparator: ',' }
    ];
  }

  formatCurrency(amount: string, currency: string) {
    let result: string;
    switch (currency) {
      case 'VND':
        result = (+amount).toLocaleString('vi-VN', { style: 'decimal', currency: 'VND' }) + ' ₫';
        break;
      case 'USD':
        result = (+amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        break;
      default:
        result = amount + ' ' + currency;
        break;
    }
    return result;
  }

  like(type: string, guid: number) {
    return this.api.createLike({ type: type, guid: guid });
  }

  unlike(type: string, guid: number) {
    return this.api.deleteLike({ type: type, guid: guid });
  }

  toastMessage(message: string, position: string, duration: number) {
    const toast = this.toastCtrl.create({
      message: message,
      position: position,
      duration: duration
    });
    toast.present();
  }

  goToPageSearch(content: string, nav: NavController) {
    // nav.push(SearchComponent, { param: content, service: this })
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    const secNum = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor((secNum - (hours * 3600)) / 60);
    const seconds = secNum - (hours * 3600) - (minutes * 60);
    let hoursString = '';
    let minutesString = '';
    let secondsString = '';
    hoursString = (hours < 10) ? '0' + hours : hours.toString();
    minutesString = (minutes < 10) ? '0' + minutes : minutes.toString();
    secondsString = (seconds < 10) ? '0' + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  getCurrentTime() {
    return this.api.getServices();
  }

  invite(from_guid: number, to_guid: number[], invitation_type: string) {
    return this.api.createInvitation({ from_guid: from_guid, to_guid: to_guid, invitation_type: invitation_type });
  }

  getTransactions(type: string) {
    return this.api.getTransactions(type);
  }

  updateAvatar(owner_guid: number, avatar_type: string, images: string[]) {
    return this.api.upload_avatar({ owner_guid: owner_guid, avatar_type: avatar_type, images: images });
  }

  updateCover(owner_guid: number, cover_type: string, images: string[]) {
    return this.api.upload_cover({ owner_guid: owner_guid, cover_type: cover_type, images: images });
  }

  confirmPassword(alertCtrl: AlertController, userService: UserService) {
    return new Promise((resolve, reject) => {
      let alert = alertCtrl.create({
        title: 'Xác nhận mật khẩu',
        inputs: [
          {
            name: 'password',
            placeholder: 'Mật Khẩu',
            type: 'password'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Login',
            handler: data => {
              userService.login(this.user_current.username, data.password).subscribe(data => {
                if (data.token != null) resolve();
                else { this.toastMessage('Mật khẩu không hợp lệ', 'bottom', 2000) }
              })
            }
          }
        ]
      });
      alert.present();
    });
  }

  imageAction(actionSheetCtrl: ActionSheetController, camera: Camera, fbService: FirebaseService) {
    return new Promise((resolve, reject) => {
      let actionSheet = actionSheetCtrl.create({
        title: 'Chọn tác vụ',
        buttons: [
          {
            text: 'Chụp ảnh',
            handler: () => {
              camera.getPicture({
                quality: 80,
                destinationType: camera.DestinationType.DATA_URL,
                encodingType: camera.EncodingType.JPEG,
                mediaType: camera.MediaType.PICTURE
              }).then((imageData) => {
                let captureDataUrl = 'data:image/jpeg;base64,' + imageData;
                let owner_from = this.user_current.username;
                let extension = ".jpg";
                let content_type = "image/jpg";
                fbService.uploadImage(owner_from, imageData, extension, content_type).then(task => {
                  resolve(task.downloadURL)
                });
              });
            }
          }, {
            text: 'Thư viện',
            handler: () => {
              var options = {
                sourceType: camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: camera.DestinationType.DATA_URL
              };
              camera.getPicture(options).then((imageData) => {
                let owner_from = this.user_current.username;
                let extension = ".jpg";
                let content_type = "image/jpg";
                fbService.uploadImage(owner_from, imageData, extension, content_type).then(task => {
                  resolve(task.downloadURL)
                });
              }, (err) => {
                // Handle error
              });
            }
          }
        ]
      });
      actionSheet.present();
    });
  }
}
