import { MessagesService } from './../../services/messages.service';
import { UserService } from './../../services/user.service';
import { Component, Input } from '@angular/core';
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
  from='user';
  constructor(
    public messagesService: MessagesService,
    public nav: NavController,
    public appCtrl: App,
    public navParams: NavParams,
    public userService: UserService) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
    this.moodLocal = JSON.parse(localStorage.getItem("mood_local"));
  }

  ngOnInit() {
    this.userGuid = this.navParams.get('userGuid');
    this.userService.getUser(null, this.userGuid).subscribe(data => {
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

  goToPage(value, type) {
    switch (type) {
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
        this.nav.push(ShopComponent, { guid: value });
        break;
      case 'gift':
        value.chat_type = "individual";
        this.nav.push(GiftComponent, { param: value });
        break;
      case 'chat':
        this.messagesService.getKeyChat(this.userCurrent.username, value.username, "individual").query.once('value', snap => {
          let key = "";
          if (snap.val() == null) {
            this.messagesService.getKeyChat(value.username, this.userCurrent.username, "individual").query.once('value', item => {
              if (item.val()) {
                key = item.val().key;
                this.messagesService.createKeyChat("individual", this.userCurrent.username, value.username, item.val());
                value.key = key;
                value.chat_type = "individual";
                value.from = value.username;
                this.appCtrl.getRootNav().push(MessageComponent, { param: value });
              } else {
                key = this.messagesService.generateKey();
                let obj = { key: key, last_read: 0, unread_count: 0 };
                this.messagesService.createKeyChat("individual", this.userCurrent.username, value.username, obj);
                this.messagesService.createKeyChat("individual", value.username, this.userCurrent.username, obj);
                value.key = key;
                value.chat_type = "individual";
                value.from = value.username;
                this.appCtrl.getRootNav().push(MessageComponent, { param: value });
              }
            });
          } else {
            key = snap.val().key;
            value.key = key;
            value.chat_type = "individual";
            value.from = value.username;
            this.appCtrl.getRootNav().push(MessageComponent, { param: value });
          }
        });
        // value.chat_type = "individual";
        // // value.key = this.user.guid;
        // this.nav.push(MessageComponent, { param: value });
        break;
      default:
        break;
    }
  }
}
