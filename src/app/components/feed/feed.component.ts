import { CustomService } from './../../services/custom.service';
import { UserComponent } from './../user/user.component';
import { User } from './../../api/models/user';
import { Feed } from './../../api/models/feed';
import { Component, Input } from '@angular/core';
import { App, MenuController, NavController, PopoverController } from 'ionic-angular';
import { FeedMenuComponent } from './feed-menu/feed-menu.component';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html'
})
export class FeedComponent {

  @Input('post') post: Feed;
  @Input('user') user: User;
  @Input('mood') mood: any;
  @Input('user_tag') userTag: Array<User>;
  descriptionPost: string;
  isShowMoreTag: any;
  isHideMoreTag: any;
  moodLocal: any;
  moodIcon: string;
  subArrUserTag: any;

  constructor(
    public menuCtrl: MenuController,
    public nav: NavController, public appCtrl: App,
    private popoverCtrl: PopoverController,
    private customService: CustomService
  ) {
    this.moodLocal = JSON.parse(localStorage.getItem("mood_local"));


  }

  hasWallPhoto = true;

  ngOnInit() {
    if (this.mood) {
      this.moodIcon = this.moodLocal[this.mood.guid]
    }

    this.isShowMoreTag = this.userTag.length > 3 ? "true" : null;
    this.isHideMoreTag = this.userTag.length < 3 ? "true" : null;

    if (this.isShowMoreTag === "true") {
      this.subArrUserTag = this.userTag.slice(0, 3);
    }
    if (this.post) {
      let description = JSON.parse(this.post.description);

      // this.post.time_created = new Date(this.post.time_created * 1000);

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
    this.appCtrl.getRootNav().push(CommentsComponent, { guid: this.post.guid });
  }

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(FeedMenuComponent);
    popover.present({
      ev: myEvent
    });
  }
  goToUserProfile(guid) {
    this.appCtrl.getRootNav().push(UserComponent, { userGuid: guid })
  }

  likeFeed() {
    this.post.likes = this.post.liked ? +this.post.likes - 1 : +this.post.likes + 1;
    if (this.post.liked) {
      this.customService.unlike('post', this.post.guid).subscribe(data => {
        if (!data.status) {
          this.post.liked = true;
          this.post.likes + 1;
        }
      })
    } else {
      this.customService.like('post', this.post.guid).subscribe(data => {
        if (!data.status) {
          this.post.liked = false;
          this.post.likes - 1;
        }
      })
    }
    this.post.liked = !this.post.liked;
  }
}
