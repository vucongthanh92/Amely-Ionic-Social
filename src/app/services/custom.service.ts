import { Product } from './../api/models/product';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';
import { ApiService } from './../api/services/api.service';
import { User } from './../api/models/user';
import { Injectable } from '@angular/core';
import { ToastController, NavController, AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
import { Notification } from '../api/models';
import { Camera } from '@ionic-native/camera';

@Injectable()
export class CustomService {

  cart = [];
  user_current: User;
  mood_local: any;
  public url_site = "http://amely.com/";
  friends: Array<User> = [];
  notifications: Array<Notification> = [];
  public url_qr = "http://amely.com/";
  public content_change_avatar = "_=-_tln$@ttonh!i~tki^abg*la_0@896428_=-!75@-=_=-ahihi=))gerrard";
  public content_change_cover = "_=-_tln$@ttonh!i~tki^abg*la_0@896428_=-!75@-=_=-ahihi=))amen";

  private currencies: Array<{ isoCode: string, displayName: string, rightSymbol: string, leftSymbol: string, decimals: number, decPoints: string, thousandSeparator: string }>;

  constructor(
    private api: ApiService,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController
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

  netPrice(product: Product): number {
    if (product.tax) {
      return +product.display_price + (+(product.display_price * (product.tax / 100)));
    } else return product.display_price;
  }
  netSalePrice(product: Product): number {
    if (product.tax) {
      return +product.display_price + (+(product.display_price * (product.tax / 100)));
    } else return product.display_price;
  }

  report(alertCtrl: AlertController, report_type: string, guid: number) {
    return new Promise((resolve, reject) => {
      let report = alertCtrl.create({
        title: 'Xác nhận',
        message: "Nội dung phản hồi sẽ được ban quản trị xem xét và có biện pháp xử lý",
        inputs: [
          {
            name: 'data',
            placeholder: 'Nhập nội dung tố cáo'
          },
        ],
        buttons: [
          {
            text: 'Hủy bỏ',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Gửi',
            handler: data => {
              this.api.report({ report_type: report_type, guid: guid, reason: data.data }).subscribe(data => {
                if (data.status) {
                  resolve();
                } else reject();
              })
            }
          }
        ]
      });
      report.present();
    });
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
            text: 'Từ chối',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Chấp nhận',
            handler: data => {
              let loading = this.loadingCtrl.create({
                content: 'Please wait...',
                enableBackdropDismiss: true
              });

              loading.present();
              userService.login(this.user_current.username, data.password).subscribe(resp => {
                loading.dismiss();
                if (resp.token != null) resolve(data.password);
                else { this.toastMessage('Mật khẩu không hợp lệ', 'bottom', 2000) }
              })
            }
          }
        ]
      });
      alert.present();
    });
  }

  imageAction(actionSheetCtrl: ActionSheetController, camera: Camera, fbService: FirebaseService, isMutil: boolean) {

    return new Promise((resolve, reject) => {
      let actionSheet = actionSheetCtrl.create({
        title: 'Chọn tác vụ',
        buttons: [
          {
            text: 'Chụp ảnh',
            handler: () => {
              let loading = this.loadingCtrl.create({
                content: 'Please wait...',
                enableBackdropDismiss: true
              });
              loading.present();
              camera.getPicture({
                quality: 80,
                destinationType: camera.DestinationType.DATA_URL,
                encodingType: camera.EncodingType.JPEG,
                correctOrientation: true,
                allowEdit: true,
                mediaType: camera.MediaType.PICTURE
              }).then((imageData) => {
                let owner_from = this.user_current.username;
                let extension = ".jpg";
                let content_type = "image/jpg";
                fbService.uploadImage(owner_from, imageData, extension, content_type, true).then(task => {
                  loading.dismiss();
                  resolve(task.downloadURL)
                });
              });
            }
          }, {
            text: 'Thư viện',
            handler: () => {
              let loading = this.loadingCtrl.create({
                content: 'Please wait...',
                enableBackdropDismiss: true
              });
              loading.present();
              var options = {
                sourceType: camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: camera.DestinationType.DATA_URL,
                correctOrientation: true,
                maximumImagesCount: isMutil ? 5 : 1
              };
              camera.getPicture(options).then((imageData) => {
                let owner_from = this.user_current.username;
                let extension = ".jpg";
                let content_type = "image/jpg";
                fbService.uploadImage(owner_from, imageData, extension, content_type, true).then(task => {
                  loading.dismiss();
                  resolve(task.downloadURL)
                });
              }, (err) => {
                // Handle error
              });
            }
          }, {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    });
  }

  imageActionTest(actionSheetCtrl: ActionSheetController, camera: Camera, fbService: FirebaseService, isMutil: boolean) {
    return new Promise((resolve, reject) => {
      let actionSheet = actionSheetCtrl.create({
        title: 'Chọn tác vụ',
        buttons: [
          {
            text: 'Chụp ảnh',
            handler: () => {
              let loading = this.loadingCtrl.create({
                content: 'Please wait...',
                enableBackdropDismiss: true
              });

              loading.present();

              setTimeout(() => {

                loading.dismiss();
                resolve('https://3.bp.blogspot.com/-sjAcMgrZh9o/WlHGQ0DYxVI/AAAAAAAAEb8/jhaf0CWg01YvZn88t-Mi3mLh2NYm_FvtACLcBGAs/s1600/gai-xinh-1.jpg')
              }, 2000);
            }
          }, {
            text: 'Thư viện',
            handler: () => {
              let loading = this.loadingCtrl.create({
                content: 'Please wait...',
                enableBackdropDismiss: true
              });
              loading.present();
              setTimeout(() => {
                loading.dismiss();
                resolve('http://lh5.googleusercontent.com/-zy_KX582Mdc/V8LTrevKr6I/AAAAAAAA2t0/q8x01QLcZGw2nSuA7bDM1USujYHBMbBvwCLcB/s1600/ohgai.net-0074280816.jpg')
              }, 2000);
            }
          }
        ]
      });
      actionSheet.present();
    });
  }

  share(share_type: string, subject_guid: number, post: string) {
    return this.api.share({ share_type: share_type, subject_guid: subject_guid, post: post });
  }

  isInteger(number: string) {
    if (isNaN(+number) || +number % 1 != 0) return false;
    else return true;
  }

  checkPasswordStrength(password) {
    var re = new RegExp('^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*[\$\%\&])|(?=.*[A-Z])(?=.*\d)(?=.*[\$\%\&])|(?=.*[A-Z])(?=.*[a-z])(?=.*[\$\%\&])).{8,16}$');
    return re.test(password);
  }

  checkDevices() {
    var ratio = window.devicePixelRatio || 1;
    var screen = {
      width: window.screen.width * ratio,
      height: window.screen.height * ratio
    };
    if (screen.width == 640 && screen.height == 1136) {
      return "top_navigation_iphone5s";
    }
    else if (screen.width == 1125 && screen.height == 2436) {
      return "top_navigation_iphonex";
    }
    else if (screen.width == 1242 && screen.height == 2208) {
      return "top_navigation_iphone7plus";
    }
    else {
      return "top_navigation_iphone6s";
    }
  }

  checkUrlImage(url, timeoutT) {
    return new Promise(function (resolve, reject) {
      var timeout = timeoutT || 5000;
      var timer, img = new Image();
      img.onerror = img.onabort = function () {
        clearTimeout(timer);
        reject("error");
      };
      img.onload = function () {
        clearTimeout(timer);
        resolve("success");
      };
      timer = setTimeout(function () {
        // reset .src to invalid URL so it stops previous
        // loading, but doens't trigger new load
        img.src = "//!!!!/noexist.jpg";
        reject("timeout");
      }, timeout);
      img.src = url;
    });
  }
}