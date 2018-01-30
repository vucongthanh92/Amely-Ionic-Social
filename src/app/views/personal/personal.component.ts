import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Nav, Platform, MenuController, NavController, PopoverController, NavParams} from 'ionic-angular';
import { ContactComponent } from './contact/contact.component';
import { MessagesComponent } from './messages/messages.component';
import { NotificationComponent } from './notification/notification.component';
import { PersonalMenuComponent } from './personal-menu/personal-menu.component';
import { ContactUsersComponent } from './contact/contact-users/contact-users.component';
import { ContactGroupsComponent } from './contact/contact-groups/contact-groups.component';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html'
})

export class PersonalComponent implements OnInit {
	
  tabActive = true;
  tab1Root = ContactComponent;
  tab2Root = MessagesComponent;
  tab3Root = NotificationComponent;

  constructor(public menuCtrl: MenuController, public nav: NavController, private popoverCtrl: PopoverController) { }

  ngOnInit() {
  }

  menuPage() {
    this.nav.push(PersonalMenuComponent);
  }

  

}
