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
  @Input('post') post: any;
  @Input('user') user: any;

  description: any;
  wallphotos: any;

  constructor(
    public menuCtrl: MenuController,
    public nav: NavController, public appCtrl: App,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
    if (this.post) {
      this.post.time_created = new Date(this.post.time_created * 1000);
      let contentBody = JSON.parse(this.post.description);
      this.description = contentBody.post;
      if (Array.isArray(this.post.wallphoto)) {
        this.wallphotos = this.post.wallphoto;
      } else {
        this.wallphotos = false;
      }

      switch (this.post.item_type) {
        case 'profile:photo':
          this.description = "Đã thay đổi hình đại diện";
          break;
        case 'cover:photo':
          this.description = "Đã thay đổi ảnh bìa";
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
