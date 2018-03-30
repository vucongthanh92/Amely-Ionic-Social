import { Notification } from './../../../api/models/notification';
import { GiftsService } from './../../../services/gifts.service';
import { CustomService } from './../../../services/custom.service';
import { MessagesService } from './../../../services/messages.service';
import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams, LoadingController } from 'ionic-angular';
import { Gift } from '../../../api/models';

@Component({
  selector: 'app-gift-detail',
  templateUrl: './gift-detail.component.html'
})
export class GiftDetailComponent implements OnInit {

  status: string;
  gift_id: string;
  notify: Notification;
  gift: Gift;
  constructor(private viewCtrl: ViewController, private navParams: NavParams, private messageService: MessagesService, private customService: CustomService,
    private giftService: GiftsService, public loadingCtrl: LoadingController) {
    this.status = this.navParams.get('status');
    this.gift_id = this.navParams.get('gift_id');
    this.notify = this.navParams.get('notify')
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
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.giftService.getGift(this.gift_id).subscribe(
      data => {
        this.gift = data;
      },
      err => {
        this.loadData(--retry);
      })
    loading.dismiss();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  acceptGift() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();
    this.messageService.acceptGift(this.customService.user_current.username, this.gift_id);
    this.customService.notifications = this.customService.notifications.filter((e) =>
      !(e.time_created == this.notify.time_created && this.notify.subject_guid == e.subject_guid));
    this.notify.notification_type = 'gift:accept';
    this.customService.notifications.unshift(this.notify)
    this.customService.toastMessage('Đã đồng ý nhận quà', 'bottom', 2000);
    this.viewCtrl.dismiss();
    loading.dismiss();
  }

  rejecttGift() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();
    this.messageService.rejectGift(this.customService.user_current.username, this.gift_id);
    this.customService.toastMessage('Đã từ chối', 'bottom', 2000);
    this.viewCtrl.dismiss();
    this.customService.notifications = this.customService.notifications.filter((e) =>
      !(e.time_created == this.notify.time_created && this.notify.subject_guid == e.subject_guid));
    this.notify.notification_type = 'gift:reject';
    this.customService.notifications.unshift(this.notify)
    loading.dismiss();
  }
}
