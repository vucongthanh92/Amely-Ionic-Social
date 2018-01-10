import { Component, OnInit } from '@angular/core';
import { ContactComponent } from './contact/contact.component';
import { MessageComponent } from './message/message.component';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html'
})
export class PersonalComponent implements OnInit {
	
  tab1Root = ContactComponent;
  tab2Root = MessageComponent;
  tab3Root = NotificationComponent;
  
  constructor() { }

  ngOnInit() {
  }

}
