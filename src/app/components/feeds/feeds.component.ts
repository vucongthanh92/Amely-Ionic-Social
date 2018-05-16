import { CustomService } from './../../services/custom.service';
import { AddFeedComponent } from './../add-feed/add-feed.component';
import { App, LoadingController } from 'ionic-angular';
import { FeedsService } from './../../services/feeds.service';
import { Mood } from './../../api/models/mood';
import { User } from './../../api/models/user';
import { Component, OnInit, Input } from '@angular/core';
import { Feed } from '../../api/models/feed';
import { Share } from '../../api/models';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html'
})

export class FeedsComponent implements OnInit {
  @Input('feed_type') feed_type: string;
  @Input('owner_guid') owner_guid: string;
  @Input('type') type: string;
  @Input('admin_guid') admin_guid: number;

  posts: Feed[];
  users: User[];
  moods: Mood[];
  shares: Share;
  offset = 0;
  is_show_btn_add_feed: boolean = false;

  private isHasData: boolean;
  constructor(
    private customService: CustomService,
    private feedsService: FeedsService,
    private appCtrl: App,
    public loadingCtrl: LoadingController,
  ) { }
  someMethod(obj) {
    if (obj.type == 'delete') {
      this.posts = this.posts.filter(e => e.guid != obj.feedGuid);
    }
  }
  ngOnInit() {
    this.refreshView(5);
    this.setShowBtnAddFeed();
  }

  setShowBtnAddFeed() {
    switch (this.type) {
      case 'user':
        if (this.owner_guid) {
          if (+this.owner_guid == this.customService.user_current.guid) {
            this.is_show_btn_add_feed = true;
          }
        } else this.is_show_btn_add_feed = true;
        break;
      case 'event':
        this.is_show_btn_add_feed = true;
        break;
      case 'group':
        this.is_show_btn_add_feed = true;
        break;
      case 'businesspage':
        if (this.admin_guid == this.customService.user_current.guid) {
          this.is_show_btn_add_feed = true;
        }
        break;
      default:
        break;
    }
  }

  refreshView(retry) {

    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }

    this.feedsService.getFeeds(this.feed_type, this.owner_guid, this.offset).subscribe(
      data => {
        if (data.posts) {
          this.offset = this.offset + data.posts.length;
          this.posts = data.posts;
          this.users = data.users;
          this.shares = data.shares;
          this.isHasData = true;
        } else {
          this.isHasData = false;
        }
      },
      err => {
        console.log(err);
        this.refreshView(--retry);

      }
    );
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.retryLoadmore(5);
      infiniteScroll.complete();
    }, 500);
  }

  retryLoadmore(retry) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.feedsService.getFeeds(this.feed_type, this.owner_guid, this.offset).subscribe(data => {
      if (data.posts != null) {
        this.posts = this.posts.concat(data.posts);
        this.users = Object.assign(this.users, data.users);
        this.shares = data.shares;
        this.offset = this.offset + data.posts.length;
      }
    }, err => this.retryLoadmore(--retry));
  }

  getPoster(poster_guid) {
    if (poster_guid) {
      return this.users[poster_guid];
    }
    return null;
  }

  getMood(moodGuid) {
    if (moodGuid) {
      if (this.customService.mood_local[moodGuid]) {
        return this.customService.mood_local[moodGuid];
      }
    }
    return null;
  }

  getUsersTag(desc) {
    let description = JSON.parse(desc);
    let arrUserTag = [];
    if (description.friend) {
      let userGuidTag = description.friend.split(",");
      userGuidTag.forEach(e => {
        arrUserTag.push(this.users[e])
      });
    }
    return arrUserTag;
  }

  addNewFeed() {
    console.log(this.owner_guid + "   " + this.type);

    this.appCtrl.getRootNav().push(AddFeedComponent, { owner_guid: this.owner_guid, type: this.type, callback: this.myCallbackFunction });
  }

  myCallbackFunction = () => {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();

    return new Promise((resolve, reject) => {
      this.offset = 0;
      this.retryGetFeed(5, loading);
      resolve();
    });
  }

  retryGetFeed(retry, loading) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.feedsService.getFeeds(this.feed_type, this.owner_guid, this.offset).subscribe(data => {
      if (data.posts) {
        this.offset = this.offset + data.posts.length;
        this.posts = data.posts;
        this.users = data.users;
        this.moods = data.moods;
        this.shares = data.shares;
        this.isHasData = true;
      } else {
        this.isHasData = false;
      }
      loading.dismiss();
    }, err => this.retryGetFeed(--retry, loading));
  }
  deleteFeedCallback = (_params) => {
    return new Promise((resolve, reject) => {
      if (_params) {

      }

      resolve();
    });
  }
}
