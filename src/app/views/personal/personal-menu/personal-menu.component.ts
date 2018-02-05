import { User } from './../../../api/models/user';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserComponent } from '../../../components/user/user.component';

@Component({
  selector: 'app-personal-menu',
  templateUrl: './personal-menu.component.html'
})

export class PersonalMenuComponent implements OnInit {

  public userCurrent: User;
  constructor(public nav: NavController) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
  }

  ngOnInit() {
  }

  changePage() {
    this.nav.push(UserComponent, { userGuid:this.userCurrent.guid});
  }

}
