import { MapComponent } from './../map/map.component';
import { FirebaseService } from './../../services/firebase.service';
import { FeedsService } from './../../services/feeds.service';
import { CustomService } from './../../services/custom.service';
import { User } from './../../api/models/user';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { App, NavController, AlertController, NavParams, ActionSheetController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'app-add-feed',
  templateUrl: './add-feed.component.html'
})
export class AddFeedComponent implements OnInit {

  @Input('search') search: string;
  @Input('content') content: string;
  @Input('privacy') privacy: string = '2';
  @ViewChild('search') searchbar;


  public is_show_tag: boolean;
  public is_show_autocomplete: boolean = false;
  public users: Array<User>;
  public usersTmp: Array<User>;
  public usersTag: Array<User> = [];
  public moods: any;
  public user_current: User;
  private is_open_dialog_mood = false;
  public mood_result: any;
  private type_feed: string;
  public isCreatingFeed = false;
  private owner_guid;
  private image: string;
  private callback;
  private location;
  private friends: string;
  constructor(
    public nav: NavController,
    private navParams: NavParams,
    public appCtrl: App,
    private actionSheetCtrl: ActionSheetController,
    private userService: UserService,
    private customService: CustomService,
    public alertCtrl: AlertController,
    private fbService: FirebaseService,
    private feedService: FeedsService,
    private camera: Camera
  ) {
    this.user_current = this.customService.user_current;
    this.type_feed = this.navParams.get('type')
    this.owner_guid = this.navParams.get('owner_guid')
    this.moods = JSON.parse(localStorage.getItem("mood_local"));
    this.callback = this.navParams.get('callback');
  }

  ngOnInit() {
    this.retryGetFriends(5);
  }

  retryGetFriends(retry) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.userService.getFriends(null).subscribe(data => {
      this.users = data;
      this.usersTmp = data;
    }, err => { this.retryGetFriends(5) })
  }
  showTagFriend() {
    if (this.is_show_tag) {
      setTimeout(() => {
        if (this.searchbar) {
          this.searchbar.setFocus();
        }
      }, 0);
    }
    this.is_show_tag = !this.is_show_tag;
  }

  chooseUserTag(user: User) {
    this.usersTag.push(user);
    this.search = '';
    this.is_show_autocomplete = false;
  }

  removeUserTag(user: User) {
    this.usersTag = this.usersTag.filter(e => e.guid != user.guid);
  }

  getItems(ev: any) {
    let val = ev.target.value;
    this.usersTmp = this.users;
    this.usersTmp = this.usersTmp.filter(e => !this.usersTag.some(e1 => e1.guid == e.guid));
    if (val && val.trim() != '') {
      this.is_show_autocomplete = true;
      this.usersTmp = this.usersTmp.filter((item) => {
        return (item.fullname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.is_show_autocomplete = false;
    }
  }

  showMood() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Cảm nghĩ');

    for (let key in this.moods) {
      let mood = this.moods[key];
      alert.addInput({
        type: 'radio',
        label: mood.title,
        value: key + '',
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        this.is_open_dialog_mood = false;
        this.mood_result = data;
      }
    });

    alert.present();
  }

  putFeed() {
    this.friends = '';
    this.usersTag.forEach(element => {
      this.friends = this.friends + element.guid + ","
    });
    
    if (!this.content) {
      this.customService.toastMessage('Nội dung không được để trống !', 'bottom', 3000);
    } else {
      this.isCreatingFeed = true;
      // content, friends, location, privacy, mood, images, owner_guid, type
      //type : user - group - event
      if (this.owner_guid == undefined) {
        this.owner_guid = this.customService.user_current.guid;
      }
      // this.isCreatingFeed = false;
      this.putFeedApi(5);
    }
  }

  putFeedApi(retry: number) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.feedService.putFeed(this.content, this.friends, this.location, this.privacy, this.mood_result, this.image ? [this.image] : null, this.owner_guid,
      this.type_feed).subscribe(data => {
        this.isCreatingFeed = false;
        if (data.status) {
          this.customService.toastMessage('Bài viết đã được đăng', 'bottom', 3000);
          if (this.image != null && this.image.length > 0) {
            localStorage.setItem(data.guid, JSON.stringify([this.image]));
          }
          this.callback().then(() => {
            this.nav.pop();
          });
        } else {
          this.customService.toastMessage('Đăng bài viết thất bại.Vui lòng thử lại', 'bottom', 3000);
          this.callback().then(() => {
            this.nav.pop();
          });
        }
      }, err => { this.putFeedApi(--retry) });
  }

  imageAction() {
    // this.customService.imageAction(this.actionSheetCtrl, this.camera, this.fbService)
    //   .then(url => { this.image = url + '' })

    this.customService.imageAction(this.actionSheetCtrl, this.camera, this.fbService, true)
      .then(url => { this.image = url + '' })
  }

  onLocation() {
    this.appCtrl.getRootNav().push(MapComponent, { callback: this.callbackLocation })
  }

  callbackLocation = (_params) => {
    return new Promise((resolve, reject) => {

      let alert = this.alertCtrl.create({
        title: 'Xác nhận vị trí',
        message: _params.title,
        buttons: [
          {
            text: 'Từ chối',
            role: 'cancel'
          },
          {
            text: 'Chấp nhận',
            handler: () => {
              this.location = _params.title;
            }
          }
        ]
      });
      alert.present();
      resolve();
    });
  }

  deleteImage() {
    let alert = this.alertCtrl.create({
      title: 'Xác nhận',
      message: 'Xóa hình ảnh',
      buttons: [
        {
          text: 'Hủy bỏ'
        },
        {
          text: 'Chấp nhận',
          handler: () => {
            this.image = undefined;
          }
        }
      ]
    });
    alert.present();
  }

  dismiss() {
    this.nav.pop();
  }

}