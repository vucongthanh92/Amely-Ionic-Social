import { PersonalService } from './../../personal.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { UserComponent } from '../../../../components/user/user.component';
import { MessageComponent } from '../../../../components/message/message.component';

@Component({
  selector: 'app-contact-users',
  templateUrl: './contact-users.component.html'
})
export class ContactUsersComponent implements OnInit {

  constructor(
    public nav: NavController, 
    public appCtrl: App,
    private personalService: PersonalService

  ) {}
  friends: any;
  ngOnInit() {
    this.getFriends();
  }

  goToPage() {
  	this.appCtrl.getRootNav().push(UserComponent);
  }

  goToPageChat() {
  	this.appCtrl.getRootNav().push(MessageComponent);
  }

  getFriends() {
    this.personalService.getFriends(7).subscribe(data => {
      this.friends = data;
    });
  }
}
