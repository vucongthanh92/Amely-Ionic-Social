import { FeedsService } from './../../services/feeds.service';
import { Mood } from './../../api/models/mood';
import { User } from './../../api/models/user';
import { Directive, Component, OnInit, Input } from '@angular/core';
import { Feed } from '../../api/models/feed';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html'
})

export class FeedsComponent implements OnInit {

  @Input('feed_type') feed_type: string;
  @Input('owner_guid') owner_guid: string;


  posts: Feed[];
  users: User[];
  moods: Mood[];
  shares: any;
  offset = 0;
  private isHasData: boolean;
  constructor(
    private feedsService: FeedsService
  ) { }

  ngOnInit() {
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
    });
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.feedsService.getFeeds(this.feed_type, this.owner_guid, this.offset).subscribe(data => {
        this.posts = this.posts.concat(data.posts);
        this.users = Object.assign(this.users, data.users);
        this.moods = Object.assign(this.moods, data.moods);
        this.shares = data.shares;
        this.offset = this.offset + data.posts.length;
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
      return this.moods[moodGuid];
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

}