import { guid } from './../../../api/models/guid';
import { App, MenuController, NavController, PopoverController } from 'ionic-angular';
import { CustomService } from './../../../services/custom.service';
import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../../../components/user/user.component';

@Component({
  selector: 'app-setting-private',
  templateUrl: './setting-private.component.html'
})
export class SettingPrivateComponent implements OnInit {

  is_qr: boolean = false;
  code_qr: string;
  constructor(private customService: CustomService, private nav: NavController, private appCtrl: App) { }

  ngOnInit() {

  }
  openProfile() {
    this.appCtrl.getRootNav().push(UserComponent, { userGuid: this.customService.user_current.guid });
  }

  openShop() {

  }

  openSQCard() {
    this.customService.toastMessage('Coming Soon', 'bottom', 3000)
  }

  createCode() {
    this.is_qr = true;
    this.code_qr = this.customService.url_site + 'user/' + this.customService.user_current.guid;
  }
}
