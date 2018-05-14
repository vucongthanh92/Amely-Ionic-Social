import { FeedsService } from './../../../services/feeds.service';
import { CustomService } from './../../../services/custom.service';
import { NavParams, AlertController, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Feed } from '../../../api/models';

@Component({
  selector: 'app-feed-menu',
  templateUrl: './feed-menu.component.html'
})
export class FeedMenuComponent implements OnInit {
  private post: Feed;
  public is_owner: boolean = true;
  private uploaded;
  constructor(private navParams: NavParams, private customService: CustomService, private feedService: FeedsService,
    private alertCtrl: AlertController, private nav: NavController) {
    this.post = this.navParams.get('post');
    this.is_owner = this.customService.user_current.guid == this.post.poster_guid;
    this.uploaded = this.navParams.get('callback');
  }



  ngOnInit() {
  }

  report() {
    this.nav.pop();
    this.customService.report(this.alertCtrl, 'post', this.post.guid)
      .then(() => this.customService.toastMessage('Đã gửi phản hổi', 'bottom', 3000))
      .catch(() => this.customService.toastMessage('Phản hổi thất bại', 'bottom', 3000))
  }


  deleteFeed() {
    let alert = this.alertCtrl.create({
      title: 'Xác nhận xóa bài viết !',
      buttons: [
        {
          text: 'Hủy bỏ',
          handler: data => {
            this.nav.pop();
          }
        },
        {
          text: 'Đồng ý',
          handler: data => {
            this.retryDeleteFeed(5);
          }
        }
      ]
    });
    alert.present();
  }

  retryDeleteFeed(retry) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.feedService.deleteFeed(this.post.guid).subscribe(data => {
      if (data.status) {
        this.nav.pop();
        this.uploaded.emit({ type: 'delete', feedGuid: this.post.guid });
        this.customService.toastMessage('Xóa bài viết thành công !!', 'bottom', 2000);
      } else {
        this.customService.toastMessage('Xóa bài viết thất bại. Vui lòng thử lại !!', 'bottom', 2000);
      }
    }, err => {
      this.retryDeleteFeed(--retry);
    });
  }
  share() {
    this.nav.pop();
    this.retryShareFeed(5);
  }
  retryShareFeed(retry) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.customService.share('post', this.post.guid, null).subscribe(data => {
      if (data.status) {
        this.customService.toastMessage('Bài viết đã chia sẻ thành công', 'bottom', 3000)
      } else this.customService.toastMessage('Chia sẻ thất bại', 'bottom', 3000)
    }, err => this.retryShareFeed(--retry));
  }
}
