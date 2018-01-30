import { Group } from './../../../../api/models/group';
import { User } from './../../../../api/models/user';
import { GroupService } from './../../../../services/group.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { GroupComponent } from '../../../../components/group/group.component';
import { MessageComponent } from '../../../../components/message/message.component';


@Component({
  selector: 'app-contact-groups',
  templateUrl: './contact-groups.component.html'
})
export class ContactGroupsComponent implements OnInit {

  private groups: Group[];
  private users: User[];
  private userCurrent: User;
  constructor(public nav: NavController, public appCtrl: App, public groupService: GroupService) {
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

  goToPageChat() {
    this.appCtrl.getRootNav().push(MessageComponent);
  }

}
