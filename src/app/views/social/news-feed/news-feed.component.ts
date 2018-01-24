import { SocialService } from './../social.service';
import { Directive, Component, OnInit } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { AddFeedComponent } from '../../../components/add-feed/add-feed.component';
import { FeedComponent } from '../../../components/feed/feed.component';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
})


export class NewsFeedComponent implements OnInit {
  
  posts: any;
  post: any;
  users: any;
  moods: any;
  shares: any;
  offset = 0;
  constructor(
    private socialService: SocialService,
    public nav: NavController, 
    public appCtrl: App
  ) {}

  ngOnInit() {
    this.socialService.getFeeds(this.offset).subscribe( data => {
      this.offset = this.offset + data.posts.length;
      this.posts = data.posts;
      this.users = data.users;
      this.moods = data.moods;
      this.shares = data.shares;
    });
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.socialService.getFeeds(this.offset).subscribe(data => {
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
    return this.users[poster_guid];
  }

  addNewFeed() {
  	this.appCtrl.getRootNav().push(AddFeedComponent);
  }

}
