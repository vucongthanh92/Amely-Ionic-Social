import { User } from './../../api/models/user';
import { Feed } from './../../api/models/feed';
import { Component, OnInit, Input } from '@angular/core';
import { App, Nav, Platform, MenuController, NavController, PopoverController, NavParams, Refresher} from 'ionic-angular';
import { FeedMenuComponent } from './feed-menu/feed-menu.component';
import { CommentsComponent } from '../comments/comments.component';

import moment from 'moment';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html'
})
export class FeedComponent {

  @Input('contents') contents: any;
  @Input('post') post: Feed;
  @Input('user') user: User;

  descriptionPost: string;

  constructor(
    public menuCtrl: MenuController,
    public nav: NavController, public appCtrl: App,
    private popoverCtrl: PopoverController
  ) { }

  hasWallPhoto = true;

  ngOnInit() {
    if (this.post) {
      let description = JSON.parse(this.post.description);
      
      this.post.time_created = new Date(this.post.time_created * 1000);
      
      if (Array.isArray(this.post.wallphoto) === false) {
        this.hasWallPhoto = false;
      }
      this.descriptionPost = description.post;

      switch (this.post.item_type) {
        case 'profile:photo':
          this.descriptionPost = "Đã thay đổi hình đại diện";
          break;
        case 'cover:photo':
          this.descriptionPost = "Đã thay đổi ảnh bìa";
          break;
      }
    }
  }

  changePage() {
    this.appCtrl.getRootNav().push(CommentsComponent);
  }

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(FeedMenuComponent);
    popover.present({
      ev: myEvent
    });
  }

}
