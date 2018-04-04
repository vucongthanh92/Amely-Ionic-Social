import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Component, OnInit } from '@angular/core';
import { Feed, User, Share } from '../../../api/models';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'app-feed-detail',
  templateUrl: './feed-detail.component.html'
})
export class FeedDetailComponent implements OnInit {
  post: Feed;
  user: User;
  users: User[];
  shares: Share;
  mood: any;
  is_open_from_detail: boolean;
  userTag: Array<User>;
  constructor(private navParams: NavParams, private viewCtrl: ViewController) {
    if (!this.post)
      this.post = this.navParams.get('post')
    if (!this.user)
      this.user = this.navParams.get('user')
    if (!this.mood)
      this.mood = this.navParams.get('mood')
    if (!this.userTag)
      this.userTag = this.navParams.get('user_tag')
    this.mood = this.navParams.get('mood')

    this.shares = this.navParams.get('shares')
    this.users = this.navParams.get('users')

    console.log('FeedDetailComponent');
    console.log(this.shares);

    this.is_open_from_detail = this.navParams.get('is_open_from_detail')
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  ngOnInit() {
  }

}
