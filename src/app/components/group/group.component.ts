import { GroupMenuComponent } from './group-menu/group-menu.component';
import { CustomService } from './../../services/custom.service';
import { Group } from './../../api/models/group';
import { GroupService } from './../../services/group.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams, AlertController, PopoverController } from 'ionic-angular';
import { MessageComponent } from '../message/message.component';
import { GiftComponent } from '../gift/gift.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html'
})
export class GroupComponent implements OnInit {

  groupGuid: string;
  feed_type = "group";
  group: Group;
  groups = [];
  dateCreated: Date;
  is_admin: boolean;
  reloadCallback: any;

  constructor(public alertCtrl: AlertController, public nav: NavController, public appCtrl: App, private navParams: NavParams,
    private groupService: GroupService, private customService: CustomService, public popoverCtrl: PopoverController) {
    this.groupGuid = this.navParams.get('groupGuid');
    this.reloadCallback = this.navParams.get('reloadCallback');
    this.loadData(null)
  }

  loadData(g: Group) {
    if (!g) {
      this.groupService.getGroup(this.groupGuid).subscribe(data => {
        this.groups.push(data);
        this.group = data;
        this.dateCreated = new Date(this.group.time_created * 1000);
        this.is_admin = this.group.owner_guid == this.customService.user_current.guid;
        if (!this.group.voted) this.showVoteAdmin();
        this.group.owner = this.group.members.find(e => e.guid == this.group.owner_guid);

      })
    } else {
      this.group = g;
      this.is_admin = this.group.owner_guid == this.customService.user_current.guid;
      this.group.owner = this.group.members.find(e => e.guid == this.group.owner_guid);
    }
  }
  ngOnInit() {
  }

  newfeedsPage = true;
  membersPage = false;
  groupTab = 'newfeed';

  getOwner(guid) {
    if (guid) {
      return this.group.members.find(x => x.guid == guid).fullname;
    }
  }
  goToPage(type, value) {
    switch (type) {
      case 'newfeed':
        this.newfeedsPage = true;
        this.membersPage = false;
        break;
      case 'members':
        this.newfeedsPage = false;
        this.membersPage = true;
        break;
      case 'gift':
        value.chat_type = "group";
        value.key = this.group.guid;
        this.appCtrl.getRootNav().push(GiftComponent, { param: value });
        break;
      case 'chat':
        value.chat_type = "group";
        value.key = this.group.guid;
        this.appCtrl.getRootNav().push(MessageComponent, { param: value });
        break;
      default:
        break;
    }
  }

  inviteMember() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Mời thành viên');
    const users_can_invite = this.customService.friends.filter(e => !this.group.members.some(e1 => e.guid == e1.guid));
    users_can_invite.forEach(e => {
      alert.addInput({
        type: 'checkbox',
        label: e.fullname,
        value: e.guid + "",
      });

    });
    alert.addButton('Hủy bỏ');
    alert.addButton({
      text: 'Mời',
      handler: (data: any) => {
        this.customService.invite(this.group.guid, data, 'group').subscribe(data => {
          if (data.status) {
            this.customService.toastMessage("Gửi lời mời thành công !", 'bottom', 2000);
          } else {
            this.customService.toastMessage("Gửi lời mời thất bại. Vui lòng thử lại !", 'bottom', 2000);
          }
        })
      }
    });

    alert.present();
  }

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(GroupMenuComponent, { group: this.group, callback: this.groupCallback, reload_callback: this.reloadCallback, nav: this.nav });
    popover.present({
      ev: myEvent
    });
  }
  groupCallback = (_params: Group) => {
    return new Promise((resolve, reject) => {
      if (_params) {
        this.loadData(_params);
      }
      resolve();
    });
  }

  showVoteAdmin() {
    if (this.group.candidate) {
      let alert = this.alertCtrl.create({
        title: 'Chuyển quyền admin',
        message: 'Bạn có đồng ý chuyển quyền admin cho ' + this.group.candidate.fullname,
        buttons: [
          {
            text: 'Từ chối',
            handler: () => {
              this.groupService.groupVote('no', this.group.guid).subscribe(data => {
                if (data.status) {
                  this.customService.toastMessage('Bình chọn thành công', 'bottom', 2000)
                }
              });
            }
          },
          {
            text: 'Đồng ý',
            handler: () => {
              this.groupService.groupVote('yes', this.group.guid).subscribe(data => {
                if (data.status) {
                  this.customService.toastMessage('Bình chọn thành công', 'bottom', 2000)
                }
              });
            }
          }
        ]
      });
      alert.present();
    }
  }
}
