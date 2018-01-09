import { Component, OnInit } from '@angular/core';
import { ContactComponent } from './contact/contact.component';
import { MessageComponent } from './message/message.component';
import { NotificationComponent } from './notification/notification.component';

import { GroupComponent } from './contact/group/group.component';
import { OfficialAccountComponent } from './contact/official-account/official-account.component';
import { UserComponent } from './contact/user/user.component';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html'
})
export class PersonalComponent implements OnInit {
	
  tab1Root = ContactComponent;
  tab2Root = MessageComponent;
  tab3Root = NotificationComponent;
  tab4Root = GroupComponent;
  tab5Root = OfficialAccountComponent;
  tab6Root = UserComponent;
  constructor() { }

  ngOnInit() {
  }

}
