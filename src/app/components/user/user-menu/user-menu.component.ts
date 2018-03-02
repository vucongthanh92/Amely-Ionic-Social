import { UserUpdateComponent } from './../user-update/user-update.component';
import { NavParams, App, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { CustomService } from '../../../services/custom.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html'
})
export class UserMenuComponent implements OnInit {
  public is_user_current;
  private callback: any;
  constructor(private customService: CustomService, private navParams: NavParams, private appCtrl: App, private nav: NavController) {
    this.is_user_current = this.customService.user_current.guid == this.navParams.get('user').guid;
    this.callback = this.navParams.get('callback');
  }

  ngOnInit() {
  }

  editUser() {
    this.nav.pop();
    this.nav.push(UserUpdateComponent, { callback: this.myCallbackFunction });

  }

  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      if (_params) {
        if (_params) {
          this.callback(true).then(() => { });
        }
      }
      resolve();
    });
  }
}
