import { UserMenuComponent } from './user-menu/user-menu.component';
import { guid } from './../../api/models/guid';
import { MessagesService } from './../../services/messages.service';
import { UserService } from './../../services/user.service';
import { Component, Input } from '@angular/core';
import { App, NavController, Refresher, NavParams, PopoverController, AlertController, ModalController } from 'ionic-angular';
import { AlbumComponent } from '../album/album.component';
import { FriendsComponent } from '../friends/friends.component';
import { ShopComponent } from '../shop/shop.component';
import { MessageComponent } from '../message/message.component';
import { GiftComponent } from '../gift/gift.component';
import { ChooseItemComponent } from '../gift/choose-item/choose-item.component';
import { CustomService } from '../../services/custom.service';
import { User } from '../../api/models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})

export class UserComponent {
  userGuid: string;
  username: string;
  user: User;
  feed_type = "user";
  userCurrent: any;
  genderIcon: string;
  genderLabel: string;
  birthday: string;
  iconMood: string;
  moodLocal: any;
  title_add_friend: string = 'Kết bạn';
  is_user_current: boolean = true;
  is_friend: boolean = true;
  is_hidden_friend: boolean;
  is_hidden_birthday: boolean;
  is_hidden_phone_number: boolean;
  from = 'user';
  is_failed: boolean;
  constructor(
    public messagesService: MessagesService,
    public nav: NavController,
    public appCtrl: App,
    public navParams: NavParams,
    private customService: CustomService, public popoverCtrl: PopoverController,
    public userService: UserService,
    private modalCtrl: ModalController) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
    this.moodLocal = JSON.parse(localStorage.getItem("mood_local"));
    this.nav.swipeBackEnabled = true;
  }

  ngOnInit() {
    this.userGuid = this.navParams.get('userGuid');
    this.loadData(5);
  }

  loadData(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.userService.getUser(null, this.userGuid).subscribe(data => {
      if (data.guid == null) {
        this.is_failed = true;
      } else {
        this.user = data;
        this.is_user_current = this.user.guid == this.userCurrent.guid;
        this.is_friend = this.customService.friends.some(e => e.guid == data.guid);
        this.genderIcon = this.user.gender === 'male' ? 'assets/imgs/ic_gender_male_gray.png' : 'assets/imgs/ic_gender_female_gray.png';
        this.genderLabel = this.user.gender === "male" ? "Nam" : "Nữ";
        this.is_hidden_birthday = this.user.birthdate_hidden == undefined || this.user.birthdate_hidden == '0' ? false : true;
        this.is_hidden_friend = this.user.friends_hidden == undefined || this.user.friends_hidden == '0' ? false : true;
        this.is_hidden_phone_number = this.user.mobile_hidden == undefined || this.user.mobile_hidden == '0' ? false : true;
        // console.log(this.is_hidden_birthday);
        // console.log(this.is_hidden_friend);
        // console.log(this.is_hidden_phone_number);

        let date = new Date(data.birthdate);
        this.birthday = date.getDate().toString() + "/" + (date.getMonth() + 1).toString() + "/" + date.getFullYear().toString();
        if (this.user.mood != null) {
          // this.iconMood= this.moodLocal.find(e=>e.guid===data.mood.guid).image;
          this.iconMood = this.moodLocal[this.user.mood.guid].image;
        }
      }
    },err=>this.loadData(--retry));
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
        value.from = this.userCurrent.username;
        value.to = value.username;
        console.log(value);
        console.log('123');
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
  addFriend() {
    if (this.title_add_friend === 'Kết bạn') {
      this.userService.addFriend(this.userCurrent.guid, this.user.guid, "user").subscribe(data => {
        if (data.status) {
          this.title_add_friend = "Đã gửi lời mời";
        } else {
          this.title_add_friend = 'Kết bạn';
        }
      });
      this.title_add_friend = "Đã gửi lời mời";
    }
  }
  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(UserMenuComponent, { user: this.user, callback: this.myCallbackFunction, nav: this.nav, appCtrl: this.appCtrl,
       modalCtrl: this.modalCtrl });
    popover.present({
      ev: myEvent
    });
  }
  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      if (_params) {
        this.loadData(5)
      }
      resolve();
    });
  }
}
