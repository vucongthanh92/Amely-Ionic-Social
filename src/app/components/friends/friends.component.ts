import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html'
})
export class FriendsComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }

  goToPage(value) {
  	this.appCtrl.getRootNav().push(UserComponent);
  }
}
