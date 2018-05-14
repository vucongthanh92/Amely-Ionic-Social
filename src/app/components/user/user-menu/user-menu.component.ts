import { FeedsService } from './../../../services/feeds.service';
import { UserBlockListComponent } from './../user-block-list/user-block-list.component';
import { UserService } from './../../../services/user.service';
import { UserUpdateComponent } from './../user-update/user-update.component';
import { NavParams, App, NavController, ActionSheetController, ModalController, AlertController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { CustomService } from '../../../services/custom.service';
import { User } from '../../../api/models';
import { Camera } from '@ionic-native/camera';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html'
})
export class UserMenuComponent implements OnInit {
  public is_user_current;
  private user: User;
  private callback: any;
  private navUser: NavController;
  private appCtrlUser: App;

  constructor(private customService: CustomService, private navParams: NavParams, private appCtrl: App, private nav: NavController, private userService: UserService
    , private actionSheetCtrl: ActionSheetController, private fbService: FirebaseService, private camera: Camera,
    private modalCtrl: ModalController, private alertCtrl: AlertController, private feedService: FeedsService) {
    if (this.navParams.get('user')) {
      this.is_user_current = this.customService.user_current.guid == this.navParams.get('user').guid;
      this.callback = this.navParams.get('callback');
      this.user = this.navParams.get('user');
      this.navUser = this.navParams.get('nav');
      this.appCtrlUser = this.navParams.get('appCtrl');
    }
    // this.modalCtrl = this.navParams.get('modalCtrl');
  }

  ngOnInit() {
  }

  editUser() {
    this.appCtrl.getRootNav().push(UserUpdateComponent, { callback: this.myCallbackFunction });
    this.nav.pop();

  }

  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      if (_params) {
        this.callback(true).then(() => { });
      }
      resolve();
    });
  }

  blockList() {
    this.nav.pop()
    let profileModal = this.modalCtrl.create(UserBlockListComponent);
    profileModal.present();
    console.log(23412);

  }

  changeCoverAvatar(isAvatar) {
    this.nav.pop();
    this.customService.imageAction(this.actionSheetCtrl, this.camera, this.fbService).then(url => {
      let images = [url + ''];
      if (isAvatar) {
        this.retryChangeAvatar(5, images);
      } else {
        this.retryChangeCover(5, images);
      }
    })
  }

  retryChangeCover(retry, images) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.customService.updateCover(this.user.guid, 'user', images).subscribe(data => {
      if (data.status) {
        this.callback(true).then(() => { });
        this.retryPutFeed(5, this.customService.content_change_cover, images);
      } else {
        this.customService.toastMessage('Thay đổi ảnh bìa thất bại ', 'bottom', 3000);
      }
    }, err => this.retryChangeCover(--retry, images))
  }

  retryChangeAvatar(retry, images) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.customService.updateAvatar(this.user.guid, 'user', images).subscribe(data => {
      if (data.status) {
        this.callback(true).then(() => { });
        this.retryPutFeed(5, this.customService.content_change_avatar, images);
      } else {
        this.customService.toastMessage('Thay đổi ảnh đại diện thất bại ', 'bottom', 3000);
      }
    }, err => this.retryChangeAvatar(--retry, images))
  }

  retryPutFeed(retry, content, images) {
    if (retry == 0) return;
    this.feedService.putFeed(content, null, null, 2, null, images, this.customService.user_current.guid, 'user').subscribe(data => { })
  }

  report() {
    this.nav.pop();
    this.customService.report(this.alertCtrl, "user", this.user.guid)
      .then(() => this.customService.toastMessage('Phản hồi đã được gửi', 'bottom', 3000))
      .catch(() => this.customService.toastMessage('Phản hồi gửi thất bại', 'bottom', 3000))

  }



  block() {
    this.nav.pop()
    this.retryBlock(5);
  }

  retryBlock(retry) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.userService.blockUser(this.user.guid).subscribe(data => {
      this.customService.toastMessage("Bạn đã chặn " + this.user.fullname + " thành công", 'bottom', 3000);
      this.callback(true).then(() => { });
    }, err => this.retryBlock(--retry))
  }
}
