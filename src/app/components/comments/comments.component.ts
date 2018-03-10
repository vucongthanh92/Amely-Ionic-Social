import { Comment } from './../../api/models/comment';
import { User } from './../../api/models/user';
import { UserService } from './../../services/user.service';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams, ActionSheetController } from 'ionic-angular';
import { Component, OnInit, Input } from '@angular/core';
import { FeedsService } from '../../services/feeds.service';
import { CustomService } from '../../services/custom.service';
import { FirebaseService } from '../../services/firebase.service';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit {
  private feed_guid: number;
  private offset: number = 0;
  private limit: number = 10;
  public comments: Array<Comment>;
  public users: Array<User>;
  private user_current: User;
  private comment: Comment
  @Input('content') content: string
  public image: string;

  constructor(private nav_params: NavParams, private nav_ctrl: NavController, private feed_service: FeedsService, private user_service: UserService
    , private customService: CustomService, private actionSheetCtrl: ActionSheetController, private fbService: FirebaseService, private camera: Camera) {
    this.feed_guid = this.nav_params.get('guid');
    this.user_current = JSON.parse(localStorage.getItem('loggin_user'));
  }

  ngOnInit() {
    this.feed_service.getComments(this.feed_guid, this.offset, this.limit).subscribe(data => {
      if (data.comments instanceof Array) {
        this.comments = data.comments;
        this.users = data.users;
      }
    })
  }

  checkUserCurrent(owner_guid) {
    return this.user_current.guid == owner_guid;
  }

  findUser(owner_guid: number) {
    return this.users[owner_guid];
  }

  formatDate(time: number) {
    return new Date(time * 1000);
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.offset = this.offset + this.limit;
      this.feed_service.getComments(this.feed_guid, this.offset, this.limit).subscribe(data => {
        if (data.comments instanceof Array) {
          this.comments = this.comments.concat(data.comments);
          this.users = Object.assign(this.users, data.users);
        }
      })
      infiniteScroll.complete();
    }, 500);
  }

  onSend() {
    if (this.content != '') {
      let contentTmp = this.content;
      this.feed_service.putComment(this.feed_guid, this.content, this.image).subscribe(data => {
        if (data.status) {
          this.comment = { content: contentTmp, owner_guid: this.user_current.guid, subject_guid: this.feed_guid + "", time_created: Date.now() / 1000, photo: this.image };
          if (this.comments == undefined) this.comments = [];
          this.comments.unshift(this.comment);
          this.image = null;
        }
      })
    }
    this.content = '';
  }
  imageAction() {
    this.customService.imageAction(this.actionSheetCtrl, this.camera, this.fbService).then(url => { this.image = url + '' });
  }
}
