import { Component, OnInit } from '@angular/core';
import { Nav, Platform, MenuController, NavController } from 'ionic-angular';
import { ContactComponent } from './contact/contact.component';
import { MessageComponent } from './message/message.component';
import { NotificationComponent } from './notification/notification.component';
import { PersonalMenuComponent } from './personal-menu/personal-menu.component';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html'
})
export class PersonalComponent implements OnInit {
	
  tab1Root = ContactComponent;
  tab2Root = MessageComponent;
  tab3Root = NotificationComponent;
  
  constructor(public menuCtrl: MenuController, public nav: NavController) { }

  ngOnInit() {
  }

  menuPage() {
    this.nav.push(PersonalMenuComponent);
  }
}
