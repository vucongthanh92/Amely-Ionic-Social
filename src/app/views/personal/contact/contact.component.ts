import { PersonalService } from './../personal.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';

import { MessagesComponent } from '../messages/messages.component';
import { ContactUsersComponent } from './contact-users/contact-users.component';
import { ContactGroupsComponent } from './contact-groups/contact-groups.component';
import { AddFriendComponent } from '../../../components/add-friend/add-friend.component';
import { AddGroupComponent } from '../../../components/add-group/add-group.component';

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
  
  constructor(
    public nav: NavController, 
    public appCtrl: App,
    public personalService: PersonalService
  ) {}

  ngOnInit() {
    
  }

  
  goToPage(value) {
    switch (value) {
      case 'add-group':
        this.appCtrl.getRootNav().push(AddGroupComponent);
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
}
