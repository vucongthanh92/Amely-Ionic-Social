import { Group } from './../../../../api/models/group';
import { User } from './../../../../api/models/user';
import { GroupService } from './../../../../services/group.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { GroupComponent } from '../../../../components/group/group.component';
import { MessageComponent } from '../../../../components/message/message.component';
import { MessagesService } from '../../../../services/messages.service';


@Component({
  selector: 'app-contact-groups',
  templateUrl: './contact-groups.component.html'
})
export class ContactGroupsComponent implements OnInit {

  private groups: Group[];
  private users: User[];
  private userCurrent: User;
  constructor(
    public messagesService: MessagesService,
    public nav: NavController, 
    public appCtrl: App, 
    public groupService: GroupService) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
  }

  ngOnInit() {
    this.groupService.getGroups(this.userCurrent.guid).subscribe(data => {
      this.groups = data.groups;
      this.users = data.owners;
    })
  }

  getOwner(userGuid) {
    return this.users[userGuid];
  }

  goToPage(guid) {
    this.appCtrl.getRootNav().push(GroupComponent,{groupGuid:guid});
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
