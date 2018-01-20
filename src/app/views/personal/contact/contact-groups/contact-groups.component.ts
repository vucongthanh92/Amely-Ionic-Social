import { Component, OnInit } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { GroupComponent } from '../../../../components/group/group.component';
import { MessageComponent } from '../../../../components/message/message.component';

@Component({
  selector: 'app-contact-groups',
  templateUrl: './contact-groups.component.html'
})
export class ContactGroupsComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }

  goToPage() {
  	this.appCtrl.getRootNav().push(GroupComponent);
  }

  goToPageChat() {
  	this.appCtrl.getRootNav().push(MessageComponent);
  }

}
