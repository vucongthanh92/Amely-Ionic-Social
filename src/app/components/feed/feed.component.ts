import { Component, OnInit, Input } from '@angular/core';
import { Nav, Platform, MenuController, NavController, PopoverController, NavParams} from 'ionic-angular';
import { FeedMenuComponent } from './feed-menu/feed-menu.component';

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
    public nav: NavController, 
    private popoverCtrl: PopoverController,
    
  ) { }

  ngOnInit() {
  
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

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(FeedMenuComponent);
    popover.present({
      ev: myEvent
    });
  }

}