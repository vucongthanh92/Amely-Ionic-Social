import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, PopoverController } from 'ionic-angular';
import { ContactComponent } from './contact/contact.component';
import { MessagesComponent } from './messages/messages.component';
import { NotificationComponent } from './notification/notification.component';
import { PersonalMenuComponent } from './personal-menu/personal-menu.component';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html'
})

export class PersonalComponent implements OnInit {
	
  tabActive = true;
  tab1Root = ContactComponent;
  tab2Root = MessagesComponent;
  tab3Root = NotificationComponent;

  constructor(
    public popoverCtrl: PopoverController,
    public menuCtrl: MenuController, 
    public nav: NavController) { }

  ngOnInit() {
  }

  menuPage() {
    this.nav.push(PersonalMenuComponent);
  }


  public openPopover(myEvent) {
    let popover = this.popoverCtrl.create(PersonalMenuComponent);
    popover.present({
      ev: myEvent
    });
  }

  

}
