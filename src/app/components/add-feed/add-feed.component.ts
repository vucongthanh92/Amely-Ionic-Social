import { FirebaseService } from './../../services/firebase.service';
import { guid } from './../../api/models/guid';
import { FeedsService } from './../../services/feeds.service';
import { Mood } from './../../api/models/mood';
import { filter } from 'rxjs/operators/filter';
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

  constructor(public nav: NavController, private navParams: NavParams, public appCtrl: App, private actionSheetCtrl: ActionSheetController,
    private userService: UserService, private customService: CustomService, public alertCtrl: AlertController, private fbService: FirebaseService,
    private feedService: FeedsService, private camera: Camera) {
    this.user_current = this.customService.user_current;
    this.type_feed = this.navParams.get('type')
    this.owner_guid = this.navParams.get('owner_guid')
    this.moods = JSON.parse(localStorage.getItem("mood_local"));
    this.callback = this.navParams.get('callback');
    console.log(this.user_current);
    console.log(this.usersTag);
  }

  ngOnInit() {
    this.userService.getFriends(null).subscribe(data => {
      this.users = data;
      this.usersTmp = data;
    })
  }

  showTagFriend() {
    this.is_show_tag = !this.is_show_tag;
    if (this.is_show_tag) {
      setTimeout(() => {
        if (this.searchbar) {
          this.searchbar.setFocus();
        }
      }, 0);
    }

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
    let friends: string = '';
    this.usersTag.forEach(element => {
      friends = friends + element.guid + ","
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
      // console.log(this.owner_guid);
      // console.log(this.type_feed);

      //type_feed va` owner guid post feed ntn

      this.feedService.putFeed(this.content, friends, null, this.privacy, this.mood_result, this.image ? [this.image] : null, this.owner_guid, this.type_feed).subscribe(data => {
        this.isCreatingFeed = false;
        console.log(data);
        
        if (data.status) {
          this.customService.toastMessage('Bài viết đã được đăng', 'bottom', 3000);
          this.callback().then(() => {
            this.nav.pop();
          });
        } else {
          this.customService.toastMessage('Đăng bài viết thất bại.Vui lòng thử lại', 'bottom', 3000);
          this.callback().then(() => {
            this.nav.pop();
          });
        }
      })
    }
  }
  imageAction() {
    // this.customService.imageAction(this.actionSheetCtrl, this.camera, this.fbService)
    //   .then(url => { this.image = url + '' })

    this.customService.imageAction(this.actionSheetCtrl, this.camera, this.fbService)
      .then(url => { this.image = url + '' })
  }

}