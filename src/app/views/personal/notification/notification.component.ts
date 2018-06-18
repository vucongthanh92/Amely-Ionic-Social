import { OfferResultComponent } from './../../social/offers/offer-result/offer-result.component';
import { FeedDetailComponent } from './../../../components/feed/feed-detail/feed-detail.component';
import { FeedsService } from './../../../services/feeds.service';
import { GiftDetailComponent } from './../../../components/gift/gift-detail/gift-detail.component';
import { Notification } from './../../../api/models/notification';
import { CustomService } from './../../../services/custom.service';
import { Component, OnInit } from '@angular/core';
import { App, ModalController, LoadingController } from 'ionic-angular';
import { AddFriendComponent } from '../../../components/add-friend/add-friend.component';
import { User } from '../../../api/models';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {
  notifications: Array<Notification> = [];
  loading: any;

  constructor(public customService: CustomService, private appCtrl: App,
    public modalCtrl: ModalController, private feedService: FeedsService, public loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.customService.notifications.sort(this.compareUser)
    this.customService.notifications = this.customService.notifications.filter((item, pos) => this.customService.notifications .indexOf(item) == pos    )
  }
  compareUser(a, b) {
    if (a.time_created < b.time_created)
      return 1;
    if (a.time_created > b.time_created)
      return -1;
    return 0;
  }

  convertDate(time: number) {
    return new Date(time * 1000);
  }

  retryGetFeed(retry, n) {
    if (retry == 0) return;
    this.feedService.getFeed(n.subject_guid).subscribe(data => {
      if (data.post) {
        this.appCtrl.getRootNav().push(FeedDetailComponent, {
          post: data.post,
          user: this.getPoster(data.post.poster_guid, data.users),
          mood: data.post.mood ? this.getMood(data.post.mood.guid) : null,
          user_tag: this.getUsersTag(data.post.description, data.users)
        })
        return;
      } else {
        this.customService.toastMessage('Bài viết đã bị xóa', 'bottom', 2000);
      }
    },err=>this.retryGetFeed(--retry,n))
  }


  goToPage(n: Notification) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1500);
    switch (n.notification_type) {
      case 'like:post':
      case "comments:post":
        this.retryGetFeed(5, n);
        break;
      case "event:member":
      case "event:invite":
      case 'group:inviterequest':
      case "friend:request":
        let addFriend = this.modalCtrl.create(AddFriendComponent, { position_selected: 1 });
        addFriend.present();

        break;
      case "gift:request":
        let giftRequest = this.modalCtrl.create(GiftDetailComponent, { status: 'request', gift_id: n.gift.guid, notify: n });
        giftRequest.present();
        break;
      case "gift:accept":
        let giftAccept = this.modalCtrl.create(GiftDetailComponent, { status: 'accept', gift_id: n.gift.guid, notify: n });
        giftAccept.present();
        break;
      case "gift:reject":
        let giftReject = this.modalCtrl.create(GiftDetailComponent, { status: 'reject', gift_id: n.gift.guid, notify: n });
        giftReject.present();
        break;
      case "offer":
        // console.log('offer');
        // switch (n.offer.offer_type) {
        //   case 'giveaway':
        //     let offerRult = this.modalCtrl.create(OfferResultComponent, { offer: n.offer, notify: n });
        //     offerRult.present();
        //     break;
        //   case 'normal':
        //     let offerRult = this.modalCtrl.create(OfferResultComponent, { offer: n.offer, notify: n });
        //     offerRult.present();
        //     break;
        //   case 'random':
        console.log('offer ' + n.item_guid);

        let offerRult = this.modalCtrl.create(OfferResultComponent, { offer: n.offer, notify: n, cOfferGuid: n.item_guid });
        offerRult.present();
        // break;
        // }
        break;
      case "counter":
        // console.log('counter');
        break;
      case "redeem:finished":
        // console.log("redeem:finished");
        break;

    }
  }

  getPoster(poster_guid, users: Array<User>) {
    if (poster_guid) {
      return users[poster_guid];
    }
    return null;
  }

  getMood(moodGuid) {
    if (moodGuid) {
      if (this.customService.mood_local[moodGuid]) {
        return this.customService.mood_local[moodGuid];
      }
    }
    return null;
  }

  getUsersTag(desc, users: Array<User>) {
    let description = JSON.parse(desc);
    let arrUserTag = [];
    if (description.friend) {
      let userGuidTag = description.friend.split(",");
      userGuidTag.forEach(e => {
        arrUserTag.push(users[e])
      });
    }
    return arrUserTag;
  }
}

