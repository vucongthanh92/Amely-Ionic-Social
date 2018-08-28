import { SearchService, SearchResponse, HitEntry } from './../../../../services/search.service';
import { CustomService } from './../../../../services/custom.service';
import { UserComponent } from './../../../../components/user/user.component';
import { GeolocationService } from './../../../../services/geolocation.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController, LoadingController } from 'ionic-angular';
import { NearByUserSettingComponent } from './near-by-user-setting/near-by-user-setting.component';
import { User } from '../../../../api/models';
import { Geolocation } from '../../../../../../node_modules/@ionic-native/geolocation';

@Component({
  selector: 'app-near-by-user',
  templateUrl: './near-by-user.component.html'
})
export class NearByUserComponent implements OnInit {
  fakeUsers: Array<any> = new Array(5);
  wanna_send: boolean = false;
  wanna_date: boolean = false;
  wanna_gift: boolean = false;
  wanna_trade: boolean = false;
  wanna = [];
  find: string = 'male female';
  year_current: number = (new Date()).getFullYear();
  private userCurrent: User;
  private lat: number;
  private lng: number;
  public datas: Array<HitEntry>;
  private offset: number = 0;
  private limit: number = 10;
  private findableBy: string
  private minage: number = (new Date()).getFullYear() - 80;
  private maxage: number = (new Date()).getFullYear() - 16;
  private isLoadmoreFinish = false;


  constructor(public geolocationService: GeolocationService, public nav: NavController, private searchService: SearchService,
    public appCtrl: App, private customSerive: CustomService, public loadingCtrl: LoadingController, public geolocation: Geolocation) {
    this.userCurrent = this.customSerive.user_current;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      localStorage.setItem("lat", this.lat + '');
      localStorage.setItem("lng", this.lng + '');
      this.searchService.updateGeoUser(this.userCurrent.guid + "", this.lat, this.lng, null, null, null, null).then().catch();
      this.findUser(false, null);
    }).catch((error) => {
      console.log('Error getting location', error);
      this.customSerive.toastMessage("Ứng dụng chưa được cấp quyền GPS.Vui long thử lại", 'bottom', 3000)
    });

  }

  ngOnInit() {

  }

  formatDistance(km: number) {
    if (km < 1) {
      return Math.floor(km * 1000) + " m"
    } else {
      return km.toFixed(2) + " km"
    }
  }

  findUser(isLoadmore: boolean, infiniteScroll) {
    var that = this;
    that.wanna = [];
    if (that.wanna_send) that.wanna.push({ "match": { "mood": "4" } });
    if (that.wanna_gift) that.wanna.push({ "match": { "mood": "5" } });
    if (that.wanna_trade) that.wanna.push({ "match": { "mood": "6" } });
    if (that.wanna_date) that.wanna.push({ "match": { "mood": "7" } });
    this.findableBy = this.userCurrent.gender == "male" ? "female" : "male";
    this.searchService.geoUser(this.offset, this.limit, this.userCurrent.username, this.findableBy, this.minage, this.maxage,
      that.wanna, this.find, this.lat, this.lng)
      .then((result: SearchResponse) => {
        if (isLoadmore) {
          infiniteScroll.complete();
          this.datas = this.datas.concat(result.hits.hits);
          this.isLoadmoreFinish = result.hits.hits.length == 0
        } else {
          this.datas = result.hits.hits;
        }
      })
      .catch(() => {
        infiniteScroll.complete();
      })
  }

  countAge(yob: number) {
    return new Date().getFullYear() - yob;
  }

  compareUser(a, b) {
    if (a.distance < b.distance)
      return -1;
    if (a.distance > b.distance)
      return 1;
    return 0;
  }


  goToPageProfile(guid) {
    this.appCtrl.getRootNav().push(UserComponent, { userGuid: guid });
  }

  settingSearch() {
    this.appCtrl.getRootNav().push(NearByUserSettingComponent, { callback: this.settingCallback })
  }
  // age: this.age, wanna_date: this.wanna_date, wanna_gift: this.wanna_gift, wanna_send: this.wanna_send,
  // wanna_trade: this.wanna_trade, find: this.find
  settingCallback = (_params) => {
    return new Promise((resolve, reject) => {
      // { lower: 16, upper: 80 }
      this.minage = (new Date()).getFullYear() - _params.age.upper;
      this.maxage = (new Date()).getFullYear() - _params.age.lower;
      this.wanna_date = _params.wanna_date;
      this.wanna_gift = _params.wanna_gift;
      this.wanna_send = _params.wanna_send;
      this.wanna_trade = _params.wanna_trade;
      this.find = _params.find;
      if (_params.find == undefined || _params.find == 'all') this.find = "male female"

      this.findableBy = _params.findable_by;
      this.datas = [];
      this.findUser(false, null);
      resolve();
    });
  }

  doInfinite(infiniteScroll) {
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   enableBackdropDismiss: true
    // });
    // loading.present();
    if (!this.isLoadmoreFinish) {
      this.offset = this.offset + this.limit;
      this.findUser(true, infiniteScroll);
    }else{
      infiniteScroll.complete();
    }
  }
}
