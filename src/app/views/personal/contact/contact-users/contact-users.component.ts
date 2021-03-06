import { UserService } from './../../../../services/user.service';
import { CustomService } from './../../../../services/custom.service';
import { MessagesService } from './../../../../services/messages.service';
import { User } from './../../../../api/models/user';
import { PersonalService } from './../../personal.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { UserComponent } from '../../../../components/user/user.component';
import { MessageComponent } from '../../../../components/message/message.component';
import { AddFriendComponent } from '../../../../components/add-friend/add-friend.component';

@Component({
  selector: 'app-contact-users',
  templateUrl: './contact-users.component.html'
})
export class ContactUsersComponent implements OnInit {
  fakeUsers: Array<any> = new Array(5);
  private userCurrent: User;
  private moodLocal: any;
  public friends: Array<User>;

  constructor(
    public messagesService: MessagesService,
    public nav: NavController,
    public appCtrl: App,
    public modalCtrl: ModalController,
    private customService: CustomService,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private personalService: PersonalService) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
    this.moodLocal = JSON.parse(localStorage.getItem("mood_local"));
  }

  ngOnInit() {
    this.getFriends(5);
  }

  goToPage(friend: any) {
    this.appCtrl.getRootNav().push(UserComponent, { userGuid: friend.guid });
  }

  addFriend() {
    // this.appCtrl.getRootNav().push(AddGroupComponent, { callback: this.myCallbackFunction });
    // this.appCtrl.getRootNav().push(AddFriendComponent, { position_selected: 2, callback: this.myCallbackFunction })
    let profileModal = this.modalCtrl.create(AddFriendComponent, { position_selected: 2 });
    profileModal.present();
    profileModal.onDidDismiss(() => {
      this.getFriends(5);
    })
  }

  ionViewDidEnter() {
  }

  goToPageChat(friend, chat_type) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1500);
    friend.from = this.userCurrent.username;
    friend.to = friend.username;
    console.log(friend);

    this.messagesService.getKeyChat(this.userCurrent.username, friend.username, "individual").query.once('value', snap => {
      let key = "";
      if (snap.val() == null) {
        this.messagesService.getKeyChat(friend.username, this.userCurrent.username, "individual").query.once('value', item => {
          if (item.val()) {
            key = item.val().key;
            this.messagesService.createKeyChat("individual", this.userCurrent.username, friend.username, item.val());
            friend.key = key;
            friend.chat_type = "individual";
            this.appCtrl.getRootNav().push(MessageComponent, { param: friend });
          } else {
            key = this.messagesService.generateKey();
            let obj = { key: key, last_read: 0, unread_count: 0 };
            this.messagesService.createKeyChat("individual", this.userCurrent.username, friend.username, obj);
            this.messagesService.createKeyChat("individual", friend.username, this.userCurrent.username, obj);
            friend.key = key;
            friend.chat_type = "individual";
            this.appCtrl.getRootNav().push(MessageComponent, { param: friend });
          }
        });
      } else {
        key = snap.val().key;
        friend.key = key;
        friend.chat_type = "individual";
        this.appCtrl.getRootNav().push(MessageComponent, { param: friend });
      }
    });
  }

  getFriends(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.personalService.getFriends(this.userCurrent.guid).subscribe(data => {
      if (data instanceof Array) {
        this.friends = data;
      } else this.friends = [];
    }, err => this.getFriends(--retry));
  }

  isArray(obj) {
    return obj instanceof Array;
  }
  getThought(thought: string) {
    if (thought.indexOf('_=-_tln$@ttonh!i~tki^abg*la_0@896428_=-!75@-=_=-ahihi=))') != -1 || thought.indexOf("null:data") != -1)
      return '';
    return thought;
  }
  getMoodIcon(moodID) {
    return this.moodLocal[moodID];
  }

  removeFriend(u: User) {
    let alert = this.alertCtrl.create({
      title: 'Xác nhận',
      message: 'Xóa liên hệ này ra khỏi danh bạ?',
      buttons: [
        {
          text: 'Từ chối',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Chấp nhận',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Please wait...',
              enableBackdropDismiss: true
            });
            loading.present();
            this.retryDeleteFriend(5, u, loading)
          }
        }
      ]
    });
    alert.present();
  }

  retryDeleteFriend(retry, u, loading) {
    if (retry == 0) return;
    this.userService.deleteFriend(u.guid).subscribe(data => {
      if (data.status) {
        this.friends = this.friends.filter(e => e.guid != u.guid);
        this.customService.friends = this.friends;
      } else this.customService.toastMessage('Xóa kết bạn thất bại', 'bottom', 3000);
      loading.dismiss();
    }, err => this.retryDeleteFriend(--retry, u, loading));
  }
}
