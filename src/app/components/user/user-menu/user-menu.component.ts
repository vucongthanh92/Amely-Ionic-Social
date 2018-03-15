import { UserBlockListComponent } from './../user-block-list/user-block-list.component';
import { guid } from './../../../api/models/guid';
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
    , private actionSheetCtrl: ActionSheetController, private fbService: FirebaseService, private camera: Camera, private modalCtrl: ModalController, private alertCtrl: AlertController) {
    this.is_user_current = this.customService.user_current.guid == this.navParams.get('user').guid;
    this.callback = this.navParams.get('callback');
    this.user = this.navParams.get('user');
    this.navUser = this.navParams.get('nav');
    this.appCtrlUser = this.navParams.get('appCtrl');
    // this.modalCtrl = this.navParams.get('modalCtrl');
  }

  ngOnInit() {
  }

  editUser() {
    this.nav.pop();
    this.appCtrl.getRootNav().push(UserUpdateComponent, { callback: this.myCallbackFunction });

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
      let images: string[];
      images.push(url + "");
      if (isAvatar) {
        this.customService.updateAvatar(this.user.guid, 'user', images).subscribe(data => {
          this.customService.toastMessage(data.status + " avatar", 'bottom', 10000)
          if (data.status) {
            this.callback(true).then(() => { });
          } else {
            this.customService.toastMessage('Thay đổi ảnh đại diện thất bại ', 'bottom', 3000);
          }
        })
      } else {
        this.customService.updateCover(this.user.guid, 'user', images).subscribe(data => {
          this.customService.toastMessage(data.status + " avatar", 'bottom', 10000)
          if (data.status) {
            this.callback(true).then(() => { });
          } else {
            this.customService.toastMessage('Thay đổi ảnh bìa thất bại ', 'bottom', 3000);
          }
        })
      }
    })
  }

  report() {
    this.nav.pop();
    this.customService.report(this.alertCtrl, "user", this.user.guid)
      .then(() => this.customService.toastMessage('Phản hồi đã được gửi', 'bottom', 3000))
      .catch(() => this.customService.toastMessage('Phản hồi gửi thất bại', 'bottom', 3000))

  }



  block() {
    this.nav.pop()
    this.userService.blockUser(this.user.guid).subscribe(data => {
      this.customService.toastMessage("Bạn đã chặn " + this.user.fullname + " thành công", 'bottom', 3000);
      this.callback(true).then(() => { });
    })
  }
}
