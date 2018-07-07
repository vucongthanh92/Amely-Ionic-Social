import { Comment } from './../../api/models/comment';
import { User } from './../../api/models/user';
import { NavParams, ActionSheetController, LoadingController } from 'ionic-angular';
import { Component, OnInit, Input } from '@angular/core';
import { FeedsService } from '../../services/feeds.service';
import { CustomService } from '../../services/custom.service';
import { FirebaseService } from '../../services/firebase.service';
import { Camera } from '@ionic-native/camera';
import { NavController } from 'ionic-angular';

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

  constructor(
    private nav_params: NavParams,
    private feed_service: FeedsService,
    private customService: CustomService,
    private actionSheetCtrl: ActionSheetController,
    private fbService: FirebaseService,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public nav: NavController
  ) {
    this.feed_guid = this.nav_params.get('guid');
    this.user_current = JSON.parse(localStorage.getItem('loggin_user'));
  }

  ngOnInit() {
    this.loadData(5);
  }

  loadData(retry) {
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
    this.feed_service.getComments(this.feed_guid, this.offset, this.limit).subscribe(
      data => {
        if (data.comments instanceof Array) {
          data.comments.forEach(e => {
            this.customService.checkUrlImage(e.photo, 0)
              .then(result => localStorage.removeItem("comment" + e.id))
              .catch(err => {
                console.log(localStorage.getItem("comment" + e.id));
                
                if (localStorage.getItem("comment" + e.id) != null) {
                  e.photo = localStorage.getItem("comment" + e.id);
                }
              })
          });

          this.comments = data.comments;
          this.users = data.users;

        }
        loading.dismiss();
      }
      , err => {
        this.loadData(--retry)
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
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   enableBackdropDismiss: true
    // });
    // loading.present();
    this.offset = this.offset + this.limit;
    this.retryGetComments(5, infiniteScroll);

  }

  retryGetComments(retry, infiniteScroll) {
    if (retry == 0) {
      infiniteScroll.complete();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.feed_service.getComments(this.feed_guid, this.offset, this.limit).subscribe(data => {
      infiniteScroll.complete();
      if (data.comments instanceof Array) {
        this.comments = this.comments.concat(data.comments);
        this.users = Object.assign(this.users, data.users);
      }
      // loading.dismiss();        
    }, err => this.retryGetComments(--retry, infiniteScroll))
  }

  onSend() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    if (this.content) {
      loading.present();
      let contentTmp = this.content;
      let images;
      if (this.image) {
        images = [this.image]
      }
      this.retryPutComment(5, loading, contentTmp, images);
    } else {
      this.customService.toastMessage('Bình luận không được để trống !', 'bottom', 3000);
    }
    this.content = '';
  }

  retryPutComment(retry, loading, contentTmp, images) {
    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.feed_service.putComment(this.feed_guid, this.content, images).subscribe(data => {
      if (data.status) {
        loading.dismiss();
        this.comment = { content: contentTmp, owner_guid: this.user_current.guid, subject_guid: this.feed_guid + "", time_created: Date.now() / 1000, photo: this.image };
        if (this.comments == undefined) this.comments = [];
        this.comments.unshift(this.comment);
        if (this.image) {
          localStorage.setItem("comment" + data.guid, this.image)
        }
        this.image = null;
        //save image to localstorage
      }
    }, err => this.retryPutComment(--retry, loading, contentTmp, images))
  }

  imageAction() {
    this.customService.imageAction(this.actionSheetCtrl, this.camera, this.fbService, false).then(url => { this.image = url + '' });
    // this.customService.imageActionTest(this.actionSheetCtrl, this.camera, this.fbService).then(url => { this.image = url + '' });
  }

  dismiss() {
    this.nav.pop();
  }
}
