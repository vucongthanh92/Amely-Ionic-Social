import { User } from './../../api/models/user';
import { guid } from './../../api/models/guid';
import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { App, NavController, Refresher, NavParams } from 'ionic-angular';
import { AlbumComponent } from '../album/album.component';
import { FriendsComponent } from '../friends/friends.component';
import { ShopComponent } from '../shop/shop.component';
import { MessageComponent } from '../message/message.component';
import { GiftComponent } from '../gift/gift.component';
import { ChooseItemComponent } from '../gift/choose-item/choose-item.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})

export class UserComponent {
  userGuid: string;
  username: string;
  user: any;
  feed_type = "user";
  userCurrent: any;
  genderIcon: string;
  genderLabel: string;
  isUserCurrent: any;
  birthday: string;
  iconMood: string;
  moodLocal: any;
  constructor(public nav: NavController,
    public appCtrl: App,
    public navParams: NavParams,
    public userService: UserService) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
    this.moodLocal = JSON.parse(localStorage.getItem("mood_local"));
  }

  ngOnInit() {
    this.userGuid = this.navParams.get('userGuid');
    this.getUser().subscribe(data => {
      this.user = data;
      this.genderIcon = this.user.gender === 'male' ? 'assets/imgs/ic_gender_male_gray.png' : 'assets/imgs/ic_gender_female_gray.png';
      this.genderLabel = this.user.gender === "male" ? "Nam" : "Nữ";
      this.isUserCurrent = this.userGuid == this.userCurrent.guid ? "true" : null;
      let date = new Date(data.birthdate);
      this.birthday = date.getDate().toString() + "/" + (date.getMonth() + 1).toString() + "/" + date.getFullYear().toString();
      if (this.user.mood != null) {
        // this.iconMood= this.moodLocal.find(e=>e.guid===data.mood.guid).image;
        this.iconMood = this.moodLocal[this.user.mood.guid].image;
      }

    });
  }

  getUser() {
    if (this.userGuid) {
      return this.userService.getUser(null, this.userGuid);
    } else if (this.username) {
      return this.userService.getUser(null, this.userGuid);
    }
  }
  changePageAlbum() {
    this.nav.push(AlbumComponent);
  }

  changePageFriends() {
    this.nav.push(FriendsComponent);
  }

  refreshPage() {
    this.nav.setRoot(UserComponent);
  }

  doRefresh(refresher: Refresher) {
    console.log('DOREFRESH', refresher);

    refresher.complete();
  }

  doPulling(refresher: Refresher) {
    console.log('DOPULLING', refresher.progress);
  }

  newfeedsPage = true;
  imagesPage = false;
  friendsPage = false;
  userTab = 'newfeeds';

  goToPage(value) {
    switch (value) {
      case 'newfeeds':
        this.newfeedsPage = true;
        this.imagesPage = false;
        this.friendsPage = false;
        break;
      case 'images':
        this.newfeedsPage = false;
        this.imagesPage = true;
        this.friendsPage = false;
        break;
      case 'friends':
        this.newfeedsPage = false;
        this.imagesPage = false;
        this.friendsPage = true;
        break;
      case 'shop':
        this.nav.push(ShopComponent);
        break;
      case 'gift':
        this.nav.push(ChooseItemComponent);
        break;
      case 'chat':
        this.nav.push(MessageComponent);
        break;
      default:
        break;
    }
  }
}
