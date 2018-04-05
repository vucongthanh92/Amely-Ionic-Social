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

  posts: Feed[];
  users: User[];
  moods: Mood[];
  shares: Share;
  offset = 0;

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
    // console.log(this.feed_type + "  " + this.owner_guid + "  " + this.type);
    this.refreshView(5);

  }

  refreshView(retry) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();

    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }

    this.feedsService.getFeeds(this.feed_type, this.owner_guid, this.offset).subscribe(
      data => {
        if (data.posts) {
          loading.dismiss();
          this.offset = this.offset + data.posts.length;
          this.posts = data.posts;
          this.users = data.users;
          this.shares = data.shares;          
          this.isHasData = true;
        } else {
          loading.dismiss();
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

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();

    setTimeout(() => {
      this.feedsService.getFeeds(this.feed_type, this.owner_guid, this.offset).subscribe(data => {
        
        if (data.posts != null) {
        this.posts = this.posts.concat(data.posts);
        this.users = Object.assign(this.users, data.users);
        this.shares = data.shares;
          this.offset = this.offset + data.posts.length;
        }
        loading.dismiss();        
      });

      infiniteScroll.complete();
    }, 500);
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
      });
      resolve();
    });
  }
  deleteFeedCallback = (_params) => {
    return new Promise((resolve, reject) => {
      if (_params) {

        console.log('delete');
      }

      resolve();
    });
  }
}
