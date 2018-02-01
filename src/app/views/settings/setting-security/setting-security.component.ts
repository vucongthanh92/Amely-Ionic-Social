import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { ChangePasswordComponent } from '../../../components/change-password/change-password.component';
import { ChangePhonenumberComponent } from '../../../components/change-phonenumber/change-phonenumber.component';

@Component({
  selector: 'app-setting-security',
  templateUrl: './setting-security.component.html'
})
export class SettingSecurityComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) { }

  ngOnInit() {
  }

  changePass() {
    this.appCtrl.getRootNav().push(ChangePasswordComponent);
  }

  changePhone() {
    this.appCtrl.getRootNav().push(ChangePhonenumberComponent);
  }
}
