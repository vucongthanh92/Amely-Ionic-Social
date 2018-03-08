import { FeedsService } from './../../../services/feeds.service';
import { CustomService } from './../../../services/custom.service';
import { NavParams, AlertController, App, NavController } from 'ionic-angular';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
    private alertCtrl: AlertController, private app: App, private nav: NavController) {
    this.post = this.navParams.get('post');
    this.is_owner = this.customService.user_current.guid == this.post.poster_guid;
    this.uploaded = this.navParams.get('callback');
  }



  ngOnInit() {
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
            this.feedService.deleteFeed(this.post.guid).subscribe(data => {
              if (data.status) {
                this.nav.pop();
                this.uploaded.emit({ type: 'delete', feedGuid: this.post.guid });
                this.customService.toastMessage('Xóa bài viết thành công !!', 'bottom', 2000);
              } else {
                this.customService.toastMessage('Xóa bài viết thất bại. Vui lòng thử lại !!', 'bottom', 2000);
              }
            });
          }
        }
      ]
    });
    alert.present();
  }

}
