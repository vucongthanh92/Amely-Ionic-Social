import { PersonalService } from './../personal.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController, LoadingController } from 'ionic-angular';

import { AddFriendComponent } from '../../../components/add-friend/add-friend.component';
import { AddGroupComponent } from '../../../components/add-group/add-group.component';
import { GroupService } from '../../../services/group.service';
import { CustomService } from '../../../services/custom.service';
import { ContactUsersComponent } from './contact-users/contact-users.component';
import { ContactGroupsComponent } from './contact-groups/contact-groups.component';
import { ContactBusinessComponent } from './contact-business/contact-business.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})

export class ContactComponent implements OnInit {
  usersPage = true;
  groupsPage = false;
  businessPage = false;
  contactTab = 'user';
  friends: any;
  is_load_group: boolean;

  tab1Root = ContactUsersComponent;
  tab2Root = ContactGroupsComponent;
  tab3Root = ContactBusinessComponent;

  constructor(
    public nav: NavController,
    public appCtrl: App,
    public personalService: PersonalService, private groupService: GroupService, private customService: CustomService, public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.initGroupsContact();
  }

  initGroupsContact() {
    this.retryGetGroup(5);
  }

  retryGetGroup(retry) {
    if (retry == 0) return;
    this.groupService.getGroups(this.customService.user_current.guid).subscribe(data => {
      this.groupService.groups_contact = data.groups;
      this.groupService.groups_user = data.owners;
    }, err => this.retryGetGroup(--retry))
  }

  goToPage(value) {
    switch (value) {
      case 'add-group':
        // this.nav.push(AddGroupComponent);
        this.appCtrl.getRootNav().push(AddGroupComponent, { callback: this.myCallbackFunction });
        break;
      case 'add-friend':
        this.appCtrl.getRootNav().push(AddFriendComponent);
        break;
      case 'user':
        this.usersPage = true;
        this.groupsPage = false;
        this.businessPage = false;
        break;
      case 'group':
        this.usersPage = false;
        this.groupsPage = true;
        this.businessPage = false;
        break;
      case 'business':
        this.usersPage = false;
        this.groupsPage = false;
        this.businessPage = true;
        break;
      default:
        break;
    }
  }
  myCallbackFunction = () => {
    return new Promise((resolve, reject) => {
      this.initGroupsContact();
      resolve();
    });
  }
}
