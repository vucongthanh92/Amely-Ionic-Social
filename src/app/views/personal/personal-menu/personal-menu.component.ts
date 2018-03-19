import { User } from './../../../api/models/user';
import { Component, OnInit } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { UserComponent } from '../../../components/user/user.component';

@Component({
  selector: 'app-personal-menu',
  templateUrl: './personal-menu.component.html'
})

export class PersonalMenuComponent implements OnInit {

  public userCurrent: User;
  constructor(public nav: NavController, private appCtrl: App) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
  }

  ngOnInit() {
  }

  changePage() {
    this.nav.pop();
    this.appCtrl.getRootNav().push(UserComponent, { userGuid: this.userCurrent.guid });
  }

}
