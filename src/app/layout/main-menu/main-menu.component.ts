import * as Models from './../../api/models';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';
import { SigninComponent } from './../../authentication/signin/signin.component';
import { OfferService } from './../../services/offer.service';
import { GiftsService } from './../../services/gifts.service';
import { EventsService } from './../../services/events.service';
import { GroupService } from './../../services/group.service';
import { FirebaseService } from './../../services/firebase.service';
import { CustomService } from './../../services/custom.service';
import { Nav, MenuController, App, ModalController, LoadingController } from 'ionic-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api/services/api.service';
import { PersonalComponent } from './../../views/personal/personal.component';
import { SocialComponent } from './../../views/social/social.component';
import { ShoppingComponent } from './../../views/shopping/shopping.component';
import { InventoriesComponent } from './../../views/inventories/inventories.component';
import { SettingsComponent } from './../../views/settings/settings.component';
import { UserService } from '../../services/user.service';
import { User } from '../../api/models';
import { GeolocationService } from '../../services/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation';
import { UserUpdateComponent } from '../../components/user/user-update/user-update.component';
import { AddFriendComponent } from '../../components/add-friend/add-friend.component';
import { GiftDetailComponent } from '../../components/gift/gift-detail/gift-detail.component';
import { OfferResultComponent } from '../../views/social/offers/offer-result/offer-result.component';
import { FeedDetailComponent } from '../../components/feed/feed-detail/feed-detail.component';
import { FeedsService } from '../../services/feeds.service';
@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  providers: [
    PhonegapLocalNotification
  ]
})
export class MainMenuComponent implements OnInit {
  @ViewChild(Nav) nav: Nav;
  // rootPage = QuickPayListItemComponent;
  rootPage = SocialComponent;

  pages: Array<{ title: string, component: any, image: string }>;
  loggin_user: any;
  moodLocal: any;
  public device_screen: string;
  public avatarUrl: string;
  public fullname: string;

  constructor(
    public customService: CustomService,
    public menuCtrl: MenuController,
    private api: ApiService,
    private userService: UserService,
    private fbService: FirebaseService,
    private groupService: GroupService,
    private eventService: EventsService,
    private giftService: GiftsService,
    private offerService: OfferService,
    public geolocationService: GeolocationService,
    public geolocation: Geolocation,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private feedService: FeedsService,
    private appCtrl: App
  ) {

    this.device_screen = customService.checkDevices();

    // this.moodLocal = [
    //   { guid: '7723', title: 'WANNA_TRADE', image: 'assets/imgs/ic_gift_1.png' },
    //   { guid: '7724', title: 'WANNA_GIFT', image: 'assets/imgs/ic_gift_4.png' },
    //   { guid: '7732', title: 'WANNA_GET', image: 'assets/imgs/ic_gift_3.png' },
    //   { guid: '7733', title: 'WANNA_DATE', image: 'assets/imgs/ic_like.png' },
    // ]
    this.moodLocal = {
      4: { title: 'Muốn tặng quà', image: 'assets/imgs/ic_gift_4.png', tag: 'wanna_send', guid: '4' },
      5: { title: 'Muốn nhận quà', image: 'assets/imgs/ic_gift_3.png', tag: 'wanna_gift', guid: '5' },
      6: { title: 'Muốn đổi quà', image: 'assets/imgs/ic_gift_1.png', tag: 'wanna_trade', guid: '6' },
      7: { title: 'Muốn hẹn hò', image: 'assets/imgs/ic_like.png', tag: 'wanna_date', guid: '7' }
    }
    this.customService.mood_local = this.moodLocal;
    localStorage.setItem("mood_local", JSON.stringify(this.moodLocal));

    // this.plt.ready().then(()=>{
    //   this.localNotifications.on('click').subscribe(notification => {
    //     // Insert your logic here
    //     alert(JSON.stringify(notification))
    //   });
    // })


  }

  ngOnInit() {
    this.pages = [
      { title: "fullname", component: PersonalComponent, image: "avatar" },
      { title: 'XÃ HỘI', component: SocialComponent, image: 'assets/imgs/Social.png' },
      { title: 'MUA SẮM', component: ShoppingComponent, image: 'assets/imgs/Shopping.png' },
      { title: 'KHO QUÀ', component: InventoriesComponent, image: 'assets/imgs/Inventory.png' },
      { title: 'THIẾT LẬP', component: SettingsComponent, image: 'assets/imgs/Settings.png' }
    ];
    this.getUserProfile();
  }

  getUserProfile() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();
    this.retryGetuserProfile(5, loading);
  }

  retryGetuserProfile(retry, loading) {
    if (retry == 0) {
      return;
    }
    this.api.getProfile({}).subscribe(data => {
      loading.dismiss();
      if (data.guid) {
        localStorage.setItem('loggin_user', JSON.stringify(data));
        this.customService.user_current = data;
        this.avatarUrl = data.avatar;
        this.fullname = data.fullname;
        const year = new Date(data.birthdate).getFullYear() + '';
        if (data.mood) this.fbService.syncProfileFirebase(year, data.gender, data.mood.guid + "", data.username)
        else this.fbService.syncProfileFirebase(year, data.gender, null, data.username)

        this.retryGetFriends(5, data);
        this.notifyFirebase();
        this.geolocation.getCurrentPosition().then((resp) => {
          const latitude = resp.coords.latitude;
          const longitude = resp.coords.longitude;
          localStorage.setItem("lat", latitude + '');
          localStorage.setItem("lng", longitude + '');
          this.geolocationService.setLocation(data.username, latitude, longitude);
        }).catch((error) => {
          console.log('Error getting location', error);
        });

        // check update profile        
        if (!data.address || !data.province || !data.district || !data.ward) {
          this.requestUpdateProfile()
        }
      } else {
        this.customService.toastMessage('Thông tin tài khoản đã bị thay đổi. Vui lòng đăng nhập lại', 'bottom', 3000);
        this.nav.setRoot(SigninComponent);
      }
    }, err => this.retryGetuserProfile(--retry, loading))
  }

  retryGetFriends(retry, data) {
    if (retry == 0) return
    this.api.getFriends(data.guid).subscribe(d => {
      if (d instanceof Array) {
        this.customService.friends = d;
      }
    }, err => this.retryGetFriends(--retry, data))
  }

  requestUpdateProfile() {
    let myCallbackFunction = (_params) => {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
    this.appCtrl.getRootNav().push(UserUpdateComponent, { callback: myCallbackFunction, showError: true });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.menuCtrl.close();
  }

  openPageProfile() {
    this.nav.setRoot(PersonalComponent);
    this.menuCtrl.close();
  }

  // LIKE_POST = "like:post", COMMENT_POST = "comments:post", GROUP_INVITEREQUEST = "group:inviterequest",
  // FRIEND_REQUEST = "friend:request", GIFT_REQUEST = "gift:request", GIFT_ACCEPT = "gift:accept", GIFT_REJECT = "gift:reject", EVENT_MEMBER = "event:member",
  // EVENT_INVITE = "event:invite", OFFER = "offer", COUNTER = "counter", REDEEM_FINISH = "redeem:finished"
  notifyFirebase() {
    this.fbService.getNotify(this.customService.user_current.username).query.on("value", dataSnapshot => {
      dataSnapshot.forEach(items => {
        let notify: Models.Notification;
        notify = items.val();
        // console.log(items.key);

        if (notify.poster_guid)
          this.retryLoadNotifyUser(5, notify, items.key);
        return false;
      });
    })
  }

  retryLoadNotifyUser(retry, notify, keyFirebase) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.userService.getUser(null, notify.poster_guid).subscribe(data => {
      notify.from_user = data;
      switch (notify.notification_type) {
        case 'like:post':
          notify.title = data.fullname + ' đã thích bài viết của bạn';
          this.customService.notifications.push(notify);
          if (notify.viewed == false) {
            this.showNotify(notify.subject_guid, notify.title, keyFirebase, notify);
          }
          // console.log('like: post');
          break;
        case "comments:post":
          // console.log("comments:post");
          notify.title = data.fullname + ' đã bình luận bài viết của bạn';
          this.customService.notifications.push(notify);
          if (notify.viewed == false) {
            this.showNotify(notify.subject_guid, notify.title, keyFirebase, notify);
          }
          break;
        case 'group:inviterequest':
          this.initNotifyGroup(notify, data, keyFirebase);
          break;
        case "friend:request":
          // console.log("friend:request");
          notify.title = data.fullname + ' đã gửi lời mời kết bạn';
          this.customService.notifications.push(notify);
          if (notify.viewed == false) {
            this.showNotify(notify.subject_guid, notify.title, keyFirebase, notify);
          }
          break;
        case "gift:request":
          // console.log("gift:request");
          this.initNotifyGift(notify, data, keyFirebase);
          break;
        case "gift:accept":
          // console.log("gift:accept");
          this.initNotifyGift(notify, data, keyFirebase);
          break;
        case "gift:reject":
          // console.log("gift:reject");
          this.initNotifyGift(notify, data, keyFirebase);
          break;
        case "event:member":
          // console.log("event:member");
          this.initNotifyEvent(notify, data, keyFirebase)
          break;
        case "event:invite":
          // console.log("event:invite");
          this.initNotifyEvent(notify, data, keyFirebase)
          break;
        case "offer":
          // console.log('offer');
          this.initNotifyOffer(notify, data, keyFirebase)
          break;
        case "counter":
          // console.log('counter');
          this.initNotifyOffer(notify, data, keyFirebase)
          break;
        case "redeem:finished":
          // console.log("redeem:finished");

          break;

      }
    }, err => this.retryLoadNotifyUser(--retry, notify, keyFirebase))
  }

  initNotifyGroup(notify: Models.Notification, user: User, keyFirebase) {
    this.groupService.getGroup(notify.subject_guid).subscribe(data => {
      if (data.guid != null) {
        notify.title = user.fullname + " đã mời bạn vào nhóm " + data.title;
        this.customService.notifications.push(notify);
      }
    })
  }

  initNotifyGift(notify: Models.Notification, user: User, keyFirebase) {
    this.giftService.getGift(notify.subject_guid).subscribe(data => {
      notify.gift = data;
      switch (notify.notification_type) {
        case 'gift:request':
          if (data.to_type != null) {
            if (data.to_type == "group") {
              notify.title = user.fullname + " đã tặng quà đến nhóm " + data.to_group.title;
            } else if (data.to_type == "event") {
              notify.title = user.fullname + " đã tặng quà đến sự kiện " + data.to_event.title;
            } else {
              notify.title = user.fullname + " đã tặng " + data.item.title + " đến bạn"
            }
            this.customService.notifications.push(notify);
            if (notify.viewed == false) {
              this.showNotify(notify.subject_guid, notify.title, keyFirebase, notify);
            }
          }
          break;
        case 'gift:accept':
          if (data.to_type != null) {
            if (data.to_type == "group")
              notify.title = data.to_group.title + " đã đồng ý nhận " + data.item.title + " từ bạn";
            else if (data.to_type == "event") {
              notify.title = data.to_event.title + " đã đồng ý nhận " + data.item.title + " từ bạn";
            } else if (data.to_type == "business") {
              notify.title = data.to_business.title + " đã đồng ý nhận " + data.item.title + " từ bạn";
            } else {
              notify.title = user.fullname + " đã đồng ý nhận " + data.item.title + " từ bạn";
            }
            this.customService.notifications.push(notify);
            if (notify.viewed == false) {
              this.showNotify(notify.subject_guid, notify.title, keyFirebase, notify);
            }
          }
          break;
        case 'gift:reject':
          if (data.to_type != null) {
            if (data.to_type == "group")
              notify.title = data.to_group.title + " đã từ chối nhận " + data.item.title + " từ bạn";
            else if (data.to_type == "event") {
              notify.title = data.to_event.title + " đã từ chối nhận " + data.item.title + " từ bạn";
            } else if (data.to_type == "business") {
              notify.title = data.to_business.title + " đã từ chối nhận " + data.item.title + " từ bạn";
            } else {
              notify.title = user.fullname + " đã từ chối nhận " + data.item.title + " từ bạn";
            }
            this.customService.notifications.push(notify);
            if (notify.viewed == false) {
              this.showNotify(notify.subject_guid, notify.title, keyFirebase, notify);
            }
          }
          break;
      }
    })
  }

  initNotifyEvent(notify: Models.Notification, user: User, keyFirebase) {
    this.eventService.getEvent(notify.subject_guid).subscribe(data => {
      try {
        notify.title = user.fullname + " đã mời bạn tham gia sự kiện " + data.events.title;
        this.customService.notifications.push(notify);
        if (notify.viewed == false) {
          this.showNotify(notify.subject_guid, notify.title, keyFirebase, notify);
        }
      } catch (e) {
      }
    })
  }

  initNotifyOffer(notify: Models.Notification, user: User, keyFirebase) {
    this.offerService.getOffer(notify.subject_guid).subscribe(data => {
      notify.offer = data;
      if (notify.notification_type == 'counter') {
        switch (data.offer_type) {
          case 'giveaway':
            notify.title = user.fullname + ' đã gửi đề nghị nhận ' + data.product_snapshot.title + ' #' + data.guid;
            // this.customService.notifications.push(notify);
            break;
          case 'normal':
            notify.title = user.fullname + ' đã gửi đề nghị trao đổi ' + data.product_snapshot.title + ' #' + data.guid;
            // this.customService.notifications.push(notify);
            break;
          case 'random':
            notify.title = user.fullname + ' tham gia trao đổi ngẫu nhiên với bạn.';
            // this.customService.notifications.push(notify);
            break;
        }
      } else {
        switch (data.offer_type) {
          case 'giveaway':
            notify.title = 'Bạn đã nhận được ' + data.quantity + ' ' + data.product_snapshot.title;
            break;
          case 'normal':
            if (data.owner.guid == this.customService.user_current.guid) {
              notify.title = 'Bạn đã nhận được ' + data.counter_offers[0].quantity + ' ' + data.counter_offers[0].product_snapshot.title;
            } else {
              notify.title = 'Bạn đã nhận được ' + data.quantity + ' ' + data.product_snapshot.title;
            }
            break;
          case 'random':
            notify.title = 'Trao đổi ngẫu nhiên đã được tiến hành .';
            break;
        }
        this.customService.notifications.push(notify);
        if (notify.viewed == false) {
          this.showNotify(notify.subject_guid, notify.title, keyFirebase, notify);
        }
      }

    })
  }

  showNotify(id, txt: string, keyFirebase, notify: Models.Notification) {
    var that = this;
    this.fbService.updateViewedNotify(keyFirebase, this.customService.user_current.username);
    var a = new Notification("Amely", {
      tag: id,
      body: txt,
      icon: 'assets/imgs/logo.png'
    })
    a.onclick = function () {
      that.goToPage(notify)
    };
  }

  goToPage(n: Models.Notification) {
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
    }, err => this.retryGetFeed(--retry, n))
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
