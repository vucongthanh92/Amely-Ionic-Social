import { SearchService } from './../../../../../services/search.service';
import { CustomService } from './../../../../../services/custom.service';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../../../../api/models';

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
  private userCurrent: User;

  constructor(private navParams: NavParams, private nav: NavController, private searchService: SearchService, private customService: CustomService) {
    this.callback = this.navParams.get('callback');
    this.userCurrent = this.customService.user_current;
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

    //todo update geo user
    this.searchService.updateGeoUser(this.userCurrent.guid + "", null, null, null, null, this.can_find, null, null)
      .then(result => console.log(result))
      .catch();

    //set callback send option to find nearby
    this.callback({
      age: this.age, wanna_date: this.wanna_date, wanna_gift: this.wanna_gift, wanna_send: this.wanna_send,
      wanna_trade: this.wanna_trade, find: this.find, findable_by: this.can_find
    }).then(() => {
      this.nav.pop();
    });
  }

  dismiss() {
    this.nav.pop();
  }

}
