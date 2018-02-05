import { UserComponent } from './../../../../components/user/user.component';
import { UserService } from './../../../../services/user.service';
import { User } from './../../../../api/models/user';
import { GeolocationService } from './../../../../services/geolocation.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';

@Component({
  selector: 'app-near-by-user',
  templateUrl: './near-by-user.component.html'
})
export class NearByUserComponent implements OnInit {

  private lat: number;
  private lng: number;
  public datas = [];
  private geoQueryUser;

  constructor(public geolocationService: GeolocationService, private userserive: UserService, public nav: NavController, public appCtrl: App) {
    this.lat = Number(localStorage.getItem("lat"));
    this.lng = Number(localStorage.getItem("lng"));
    this.geoQueryUser = this.geolocationService.getUsers(this.lat, this.lng);
    var that = this;
    this.geoQueryUser.on("key_entered", function (key, location, distance) {
      // console.log(key + " user query at " + location + " (" + distance + " km from center)");
      userserive.getUser(key, null).subscribe(data => {
        that.datas.push({ user: data, distance: distance });
        that.datas.sort(that.compareUser);
      })
    });

    let geoQueryShop = this.geolocationService.getShops(this.lat, this.lng);
    geoQueryShop.on("key_entered", function (key, location, distance) {
      // console.log(key + " shop query at " + location + " (" + distance + " km from center)");
    });


  }

  compareUser(a, b) {
    if (a.distance < b.distance)
      return -1;
    if (a.distance > b.distance)
      return 1;
    return 0;
  }

  formatDistance(km: number) {
    if (km < 1) {
      return Math.floor(km * 1000) + " m"
    } else {
      return km.toFixed(2) + " km"
    }
  }

  goToPageProfile(guid) {
    console.log(guid);
    this.appCtrl.getRootNav().push(UserComponent, { userGuid: guid });
  }

  countAge(birthday: string) {
    let date = new Date(birthday);
    return new Date().getFullYear()-date.getFullYear();

  }

  ngOnInit() {
  }

}
