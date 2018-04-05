import { CustomService } from './../../../../services/custom.service';
import { FirebaseService } from './../../../../services/firebase.service';
import { UserComponent } from './../../../../components/user/user.component';
import { UserService } from './../../../../services/user.service';
import { GeolocationService } from './../../../../services/geolocation.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController, LoadingController } from 'ionic-angular';
import { NearByUserSettingComponent } from './near-by-user-setting/near-by-user-setting.component';

@Component({
  selector: 'app-near-by-user',
  templateUrl: './near-by-user.component.html'
})
export class NearByUserComponent implements OnInit {
  fakeUsers: Array<any> = new Array(5);
  age: { lower: number, upper: number } = { lower: 16, upper: 80 };
  wanna_send: boolean = false;
  wanna_date: boolean = false;
  wanna_gift: boolean = false;
  wanna_trade: boolean = false;
  wanna = [];
  find: string = 'all';
  year_current: number = (new Date()).getFullYear();
  private lat: number;
  private lng: number;
  public datas;
  private geoQueryUser;
  private user_fb: { findable_by: string, gender: string, mood: string, yob: string };

  

  constructor(public geolocationService: GeolocationService, private userserive: UserService, public nav: NavController,
    public appCtrl: App, private fbService: FirebaseService, private customSerive: CustomService, public loadingCtrl: LoadingController) {
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   enableBackdropDismiss: true
    // });
    // loading.present();
    
    this.lat = Number(localStorage.getItem("lat"));
    this.lng = Number(localStorage.getItem("lng"));
    this.geoQueryUser = this.geolocationService.getUsers(this.lat, this.lng);
    this.findUser();
    // loading.dismiss();

  }

  findUser() {
    var that = this;
   
    that.wanna = [];
    if (that.wanna_date) that.wanna.push('wanna_date');
    if (that.wanna_gift) that.wanna.push('wanna_gift');
    if (that.wanna_send) that.wanna.push('wanna_send');
    if (that.wanna_trade) that.wanna.push('wanna_trade');
    this.geoQueryUser.on("key_entered", function (key, location, distance) {
      // console.log(key + " user query at " + location + " (" + distance + " km from center)");

      that.fbService.findUser(key).query.on('value', snap => {
        that.user_fb = snap.val();
        if (that.checkUser(that.user_fb, key)) {
          
          that.userserive.getUser(key, null).subscribe(data => {
            if (!that.datas) {
              that.datas = [];
            }
            that.datas.push({ user: data, distance: distance });
            that.datas.sort(that.compareUser);
          })
        };
        return false;
      })

    });
  }
  checkUser(userFB: { findable_by: string, gender: string, mood: string, yob: string }, username) {
    userFB.findable_by = userFB.findable_by ? userFB.findable_by : 'all';
    userFB.gender = userFB.gender ? userFB.gender : 'all';
    userFB.yob = userFB.yob ? userFB.yob : '1970';
    userFB.mood = userFB.mood ? userFB.mood : '';
    this.find = this.find ? this.find : 'all';
    const age = +this.year_current - +userFB.yob;
    // console.log(userFB);
    // console.log(this.age);
    // console.log('age ' + age);
    // console.log(userFB.yob);
    // console.log('wanna_date ' + this.wanna_date + "  7733");
    // console.log('wanna_gift ' + this.wanna_gift + "  7732");
    // console.log('wanna_send ' + this.wanna_send + "  7724");
    // console.log('wanna_trade ' + this.wanna_trade + "  7723");
    // console.log('find ' + this.find);
    if (this.customSerive.user_current.username != username) {
      // console.log('1 khac user');
      if (this.checkMood(userFB, username)) {
        // console.log("2 mood");
        if (age > this.age.lower && age < this.age.upper) {
          // console.log('3 age' + " " + username);
          // console.log(this.age);
          // console.log(userFB.yob);
          // console.log(age);
          // console.log(this.year_current);
          
          if (userFB.findable_by == 'all' || userFB.findable_by == this.customSerive.user_current.gender) {
            // console.log('4 findable')
            if (this.find == 'all' || this.find == userFB.gender) {
              // console.log('5 gender');
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  compareUser(a, b) {
    if (a.distance < b.distance)
      return -1;
    if (a.distance > b.distance)
      return 1;
    return 0;
  }
  // userFB: { findable_by: string, gender: string, mood: string, yob: string }
  checkMood(userFB: { findable_by: string, gender: string, mood: string, yob: string }, username) {

    // if (this.wanna_date) {
    //   if (this.customSerive.mood_local[userFB.mood]) {
    //     return this.customSerive.mood_local[userFB.mood].tag == 'wanna-date';
    //   } else return false;
    // } else if (this.wanna_gift) {
    //   if (this.customSerive.mood_local[userFB.mood]) {
    //     return this.customSerive.mood_local[userFB.mood].tag == 'wanna_gift';
    //   } else return false;
    // } else if (this.wanna_send) {
    //   if (this.customSerive.mood_local[userFB.mood]) {
    //     return this.customSerive.mood_local[userFB.mood].tag == 'wanna_send';
    //   } else return false;
    // } else if (this.wanna_trade) {
    //   if (this.customSerive.mood_local[userFB.mood]) {
    //     return this.customSerive.mood_local[userFB.mood].tag == 'wanna_trade';
    //   } else return false;
    // } else return true;
    if (!this.wanna_date && !this.wanna_gift && !this.wanna_send && !this.wanna_trade) {
      return true;
    } else {
      if (this.customSerive.mood_local[userFB.mood]) {
        return this.wanna.some(e => e == this.customSerive.mood_local[userFB.mood].tag)
      }

    }

  }
  formatDistance(km: number) {
    if (km < 1) {
      return Math.floor(km * 1000) + " m"
    } else {
      return km.toFixed(2) + " km"
    }
  }

  goToPageProfile(guid) {
    this.appCtrl.getRootNav().push(UserComponent, { userGuid: guid });
  }

  countAge(birthday: string) {
    let date = new Date(birthday);
    return new Date().getFullYear() - date.getFullYear();

  }

  ngOnInit() {
  }

  settingSearch() {
    this.appCtrl.getRootNav().push(NearByUserSettingComponent, { callback: this.settingCallback })
  }
  // age: this.age, wanna_date: this.wanna_date, wanna_gift: this.wanna_gift, wanna_send: this.wanna_send,
  // wanna_trade: this.wanna_trade, find: this.find
  settingCallback = (_params) => {
    return new Promise((resolve, reject) => {
      this.age = _params.age;
      this.wanna_date = _params.wanna_date;
      this.wanna_gift = _params.wanna_gift;
      this.wanna_send = _params.wanna_send;
      this.wanna_trade = _params.wanna_trade;
      this.find = _params.find;
      this.findUser();
      resolve();
    });
  }
}
