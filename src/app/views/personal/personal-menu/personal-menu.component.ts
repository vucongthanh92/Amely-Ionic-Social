import { Component, OnInit } from '@angular/core';
import { Nav, Platform, MenuController, NavController } from 'ionic-angular';
import { UserComponent } from '../../../components/user/user.component';

@Component({
  selector: 'app-personal-menu',
  templateUrl: './personal-menu.component.html'
})
export class PersonalMenuComponent implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  changePage() {
    this.nav.push(UserComponent);
  }

}
