import { CustomService } from './../../../../../services/custom.service';
import { FirebaseService } from './../../../../../services/firebase.service';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-near-by-user-setting',
  templateUrl: './near-by-user-setting.component.html'
})
export class NearByUserSettingComponent implements OnInit {
  age: any = { lower: 16, upper: 80 };
  wanna_send: boolean = false;
  wanna_date: boolean = false;
  wanna_gift: boolean = false;
  wanna_trade: boolean = false;
  can_find: string;
  find: string;
  callback;

  constructor(private navParams: NavParams, private nav: NavController, private fbService: FirebaseService, private customService: CustomService) {
    this.callback = this.navParams.get('callback');
  }

  ngOnInit() {

  }
  save() {
    // console.log(this.age);
    // console.log('wanna_date ' + this.wanna_date);
    // console.log('wanna_gift ' + this.wanna_gift);
    // console.log('wanna_send ' + this.wanna_send);
    // console.log('wanna_trade ' + this.wanna_trade);
    // console.log(this.can_find);
    // console.log(this.find);
    if (this.can_find) {
      this.fbService.updateFindableBy(this.customService.user_current.username, this.can_find);
    }
    this.callback({ age: this.age, wanna_date: this.wanna_date, wanna_gift: this.wanna_gift, wanna_send: this.wanna_send, 
      wanna_trade: this.wanna_trade, find: this.find }).then(() => {
      this.nav.pop();
    });
  }

  dismiss() {
    this.nav.pop();
  }

}
