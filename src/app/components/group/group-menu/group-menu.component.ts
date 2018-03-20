import { InventoryComponent } from './../../inventory/inventory.component';
import { QrComponent } from './../../qr/qr.component';
import { GroupService } from './../../../services/group.service';
import { CustomService } from './../../../services/custom.service';
import { NavParams, AlertController, NavController, App, ActionSheetController } from 'ionic-angular';
import { Component, OnInit, group } from '@angular/core';
import { User, Group } from '../../../api/models';
import { FirebaseService } from '../../../services/firebase.service';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'app-group-menu',
  templateUrl: './group-menu.component.html'
})
export class GroupMenuComponent implements OnInit {
  navGroupConponent: NavController;
  group: Group;
  user_current: User;
  callback: any;
  is_owner: boolean;
  has_inventory: boolean;
  is_show_request_change_admin: boolean;
  reloadCallback: any;
  members: Array<User> = [];
  constructor(private navParams: NavParams, private customService: CustomService, private appCtrl: App,
    public alertCtrl: AlertController, private groupSerive: GroupService, private nav: NavController
    , private actionSheetCtrl: ActionSheetController, private fbService: FirebaseService, private camera: Camera) {
    this.group = this.navParams.get('group');
    this.user_current = this.customService.user_current;
    this.callback = this.navParams.get('callback');
    this.reloadCallback = this.navParams.get('reload_callback');
    this.navGroupConponent = this.navParams.get('nav');
    this.is_owner = this.user_current.guid == this.group.owner_guid;
    this.has_inventory = this.group.has_inventory == '2';
    this.is_show_request_change_admin = this.group.has_inventory && this.group.members.length >= 4 && !this.is_owner;
    this.members = this.group.members.filter(e => e.guid != this.group.owner_guid);
    console.log(this.group);

  }

  ngOnInit() {
  }

  changeAdmin() {
    this.showDialogChooseMember()
  }

  deleteGroup() {
    this.nav.pop();
    let alert = this.alertCtrl.create({
      title: 'Xác nhận',
      message: 'Bạn muốn xóa nhóm này không ?',
      buttons: [
        {
          text: 'Từ chối',
          role: 'cancel'
        },
        {
          text: 'Đồng ý',
          handler: () => {
            this.groupSerive.deleteGroup(this.group.guid).subscribe(data => {
              if (data.status) {
                this.customService.toastMessage('Xóa nhóm thành công', 'bottom', 2000);
                this.reloadCallback({ type: 'remove', group: this.group }).then(() => {
                  this.navGroupConponent.pop();
                });
              } else this.customService.toastMessage('Rời nhóm thất bại', 'bottom', 2000);
            })
          }
        }
      ]
    });
    alert.present();
  }

  outGroup() {
    this.nav.pop();
    let alert = this.alertCtrl.create({
      title: 'Xác nhận',
      message: 'Bạn muốn rời khỏi nhóm này ?',
      buttons: [
        {
          text: 'Từ chối',
          role: 'cancel'
        },
        {
          text: 'Đồng ý',
          handler: () => {
            this.groupSerive.outGroup(this.group.guid).subscribe(data => {

              if (data.status) {
                this.customService.toastMessage('Rời nhóm thành công', 'bottom', 2000);
                this.reloadCallback({ type: 'remove', group: this.group }).then(() => {
                  this.navGroupConponent.pop();
                });
              } else this.customService.toastMessage('Rời nhóm thất bại', 'bottom', 2000);
            })
          }
        }
      ]
    });
    alert.present();
  }

  requestChangeAdmin() {
    this.nav.pop();
    this.showDialogChooseMember();
  }
  showDialogChooseMember() {
    this.nav.pop();
    let alert = this.alertCtrl.create();
    alert.setTitle('Chọn thành viên');

    this.members.forEach(e => {
      alert.addInput({
        type: 'radio',
        label: e.fullname,
        value: e.guid + ""
      });
    });

    alert.addButton('Từ chối');
    alert.addButton({
      text: 'Chấp nhận',
      handler: (guid: any) => {
        this.groupSerive.requestChangeAdmin(+guid, this.group.guid).subscribe(data => {
          if (data.status) {
            if (this.is_owner) {
              this.customService.toastMessage('Thành công', 'bottom', 2000);
              this.group.owner_guid = guid;
              this.callback(this.group).then(() => { })
            } else {
              this.customService.toastMessage('Yêu cầu chuyển quyền admin đã được gửi', 'bottom', 4000);
            }
          }
        })
      }
    });
    alert.present();
  }

  openQR() {
    this.nav.pop();
    this.navGroupConponent.push(QrComponent, { code: this.customService.url_qr + "group/" + this.group.guid })
  }
  openInventory() {
    this.nav.pop();
    this.appCtrl.getRootNav().push(InventoryComponent, { type: 'group', ownerGuid: this.group.guid, obj: this.group });
  }
  changeAvatarCover(isAvatar: string) {
    this.nav.pop();
    this.customService.imageActionTest(this.actionSheetCtrl, this.camera, this.fbService).then(url => {
      let images = [url + ''];
      console.log(images);

      if (isAvatar) {
        this.customService.updateAvatar(this.group.guid, 'group', images).subscribe(data => {
          this.customService.toastMessage(data.status + " avatar", 'bottom', 10000)
          if (data.status) {
            this.group.avatar = url + "";
            this.callback(this.group).then(() => { })
          } else {
            this.customService.toastMessage('Thay đổi ảnh đại diện thất bại ', 'bottom', 2000);
          }
        })
      } else {
        this.customService.updateCover(this.group.guid, 'group', images).subscribe(data => {
          this.customService.toastMessage(data.status + " avatar", 'bottom', 10000)
          if (data.status) {
            this.group.cover = url + "";
            this.callback(this.group).then(() => { })
          } else {
            this.customService.toastMessage('Thay đổi ảnh bìa thất bại ', 'bottom', 2000);
          }
        })
      }
    });
  }
}