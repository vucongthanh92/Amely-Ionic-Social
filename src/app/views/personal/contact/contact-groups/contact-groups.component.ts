import { CustomService } from './../../../../services/custom.service';
import { AddGroupComponent } from './../../../../components/add-group/add-group.component';
import { Group } from './../../../../api/models/group';
import { User } from './../../../../api/models/user';
import { GroupService } from './../../../../services/group.service';
import { Component, OnInit, Input } from '@angular/core';
import { App, NavController, LoadingController } from 'ionic-angular';
import { GroupComponent } from '../../../../components/group/group.component';
import { MessageComponent } from '../../../../components/message/message.component';
import { MessagesService } from '../../../../services/messages.service';


@Component({
  selector: 'app-contact-groups',
  templateUrl: './contact-groups.component.html'
})
export class ContactGroupsComponent implements OnInit {

  @Input('callback') callback;
  private groups: Group[];
  private users: User[];
  private userCurrent: User;
  constructor(
    public messagesService: MessagesService,
    public nav: NavController,
    public appCtrl: App,
    public groupService: GroupService,
    private customService: CustomService,
    public loadingCtrl: LoadingController
  ) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));

  }

  ionViewDidEnter() {

  }

  loadData(retry) {
    
 let loading = this.loadingCtrl.create({
    content: 'Please wait...',
    enableBackdropDismiss: true
  });
  loading.present();
  
    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.groupService.getGroups(this.userCurrent.guid).subscribe(data => {
      this.groups = data.groups;
      this.users = data.owners;
      loading.dismiss();
    }, err => this.loadData(--retry))
  }
  ngOnInit() {
    this.loadData(5);
  }

  getOwner(userGuid) {
    return this.users[userGuid];
  }

  reloadCallback = (_params) => {
    return new Promise((resolve, reject) => {
      if (_params.type = 'reload') {
        this.loadData(5);
      } else if (_params.type == 'remove') {
        this.groups = this.groups.filter(e => e.guid != _params.group.guid)
      }
      resolve();
    });
  }

  goToPage(guid, type) {
    if (type == 'add-group') {
      this.appCtrl.getRootNav().push(AddGroupComponent, { callback: this.reloadCallback })
    } else this.appCtrl.getRootNav().push(GroupComponent, { groupGuid: guid, reloadCallback: this.reloadCallback });
  }

  goToPageChat(group, chat_type) {
    this.messagesService.getKeyChat(this.userCurrent.username, group.guid, "group").query.once('value', snap => {
      if (snap.val()) {
        group.key = group.guid;
        group.chat_type = "group";
        this.appCtrl.getRootNav().push(MessageComponent, { param: group });
      } else {
        let obj = { key: group.guid, last_read: 0, unread_count: 0 };
        this.messagesService.createKeyChat("group", this.userCurrent.username, group.guid, obj);
        group.key = group.guid;
        group.chat_type = "group";
        this.appCtrl.getRootNav().push(MessageComponent, { param: group });
      }
    });
  }

}
