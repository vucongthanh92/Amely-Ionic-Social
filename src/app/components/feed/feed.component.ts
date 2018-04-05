import { BusinessComponent } from './../business/business.component';
import { GroupComponent } from './../group/group.component';
import { EventComponent } from './../event/event.component';
import { CustomService } from './../../services/custom.service';
import { UserComponent } from './../user/user.component';
import { User } from './../../api/models/user';
import { Feed } from './../../api/models/feed';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { App, MenuController, NavController, PopoverController } from 'ionic-angular';
import { FeedMenuComponent } from './feed-menu/feed-menu.component';
import { CommentsComponent } from '../comments/comments.component';
import { FeedDetailComponent } from './feed-detail/feed-detail.component';
import { Share } from '../../api/models';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html'
})
export class FeedComponent {

  @Input('post') post: Feed;
  @Input('users') users: User[];
  @Input('shares') shares: Share;
  @Input('user') user: User;
  @Input('mood') mood: any;
  @Input('isShowMoreContent') isShowMoreContent: boolean = false;
  @Input('user_tag') userTag: Array<User>;
  @Input('type') type: string;
  // open from feed detail component
  @Input('is_open_from_detail') is_open_from_detail: boolean;
  @Output()
  uploaded = new EventEmitter<string>();

  postShare: Feed;
  descriptionPost: string;
  descriptionPostShare: string;
  location: string;
  isShowMoreTag: any;
  isHideMoreTag: any;
  moodLocal: any;
  moodIcon: string;
  subArrUserTag: any;
  is_change_avatar: boolean;
  is_change_conver: boolean;
  is_owner: boolean = false;
  //content lenght than 1000 character =true
  is_show_detail: boolean = false;
  constructor(
    public menuCtrl: MenuController,
    public nav: NavController, public appCtrl: App,
    private popoverCtrl: PopoverController,
    private customService: CustomService,
  ) {
    this.moodLocal = JSON.parse(localStorage.getItem("mood_local"));


  }

  hasWallPhoto = true;

  ngOnInit() {
    if (this.post && this.post.item_guid) {
      try {
        this.postShare = this.shares.posts[this.post.item_guid];
        this.descriptionPostShare = JSON.parse(this.postShare.description).post;
        if (this.descriptionPostShare == '_=-_tln$@ttonh!i~tki^abg*la_0@896428_=-!75@-=_=-ahihi=))gerrard') {
          this.descriptionPostShare = 'Đã thay đổi ảnh đại diện'
        } else if (this.descriptionPostShare == '_=-_tln$@ttonh!i~tki^abg*la_0@896428_=-!75@-=_=-ahihi=))amen') {
          this.descriptionPostShare = 'Đã thay đổi ảnh bìa'
        }
      } catch (error) { }
    }

    this.is_owner = this.customService.user_current.guid == this.post.poster_guid;
    this.isShowMoreTag = this.userTag.length > 3 ? "true" : null;
    this.isHideMoreTag = this.userTag.length < 3 ? "true" : null;

    if (this.isShowMoreTag === "true") {
      this.subArrUserTag = this.userTag.slice(0, 3);
    }
    if (this.post) {
      let description = JSON.parse(this.post.description);

      if (Array.isArray(this.post.wallphoto) === false) {
        this.hasWallPhoto = false;
      }
      this.descriptionPost = description.post;
      this.location = description.location;
      if (this.isShowMoreContent) {
        if (this.descriptionPost.length > 1000) {
          this.descriptionPost = this.descriptionPost.substring(0, 1000) + " ...";
          this.is_show_detail = true;
        }
      }

      switch (this.post.item_type) {
        case 'profile:photo':
          this.descriptionPost = "Đã thay đổi hình đại diện";
          break;
        case 'cover:photo':
          this.descriptionPost = "Đã thay đổi ảnh bìa";
          break;
      }
      if (this.descriptionPost == '_=-_tln$@ttonh!i~tki^abg*la_0@896428_=-!75@-=_=-ahihi=))gerrard') {
        this.descriptionPost = 'Đã thay đổi ảnh bìa'
      } else if (this.descriptionPost == '_=-_tln$@ttonh!i~tki^abg*la_0@896428_=-!75@-=_=-ahihi=))amen') {
        this.descriptionPost = 'Đã thay đổi ảnh đại diện'
      }
    }
  }

  changePage() {
    this.appCtrl.getRootNav().push(CommentsComponent, { guid: this.post.guid });
  }

  openFeedDetail() {
    if (this.isShowMoreContent && this.is_show_detail) {
      this.appCtrl.getRootNav().push(FeedDetailComponent, {
        post: this.post,
        user: this.user,
        mood: this.mood,
        user_tag: this.userTag,

        is_open_from_detail: true
      })
    }
  }

  convertDate(time: number) {
    return new Date(time * 1000);
  }
  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(FeedMenuComponent, { post: this.post, callback: this.uploaded });
    popover.present({
      ev: myEvent
    });
  }
  // goToUserProfile(guid) {
  //   console.log(guid);

  //   this.appCtrl.getRootNav().push(UserComponent, { userGuid: guid })
  // }

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
  openOwner(type: string, guid) {
    console.log(guid);
    console.log(type);

    switch (type) {
      case 'event':
        this.appCtrl.getRootNav().push(EventComponent, { event_guid: guid })
        break;
      case 'group':
        this.appCtrl.getRootNav().push(GroupComponent, { groupGuid: guid })
        break;
      case 'businesspage':
        this.appCtrl.getRootNav().push(BusinessComponent, { guid: guid })
        break;
      case 'user':
        this.appCtrl.getRootNav().push(UserComponent, { userGuid: guid })
        break;
    }

  }

  openFeedDetailFromImage() {
    this.appCtrl.getRootNav().push(FeedDetailComponent, {
      post: this.post,
      user: this.user,
      mood: this.mood,
      users: this.users,
      shares: this.shares,
      user_tag: this.userTag,
      is_open_from_detail: true
    })
  }
}
