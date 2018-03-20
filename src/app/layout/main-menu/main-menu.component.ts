import { OfferService } from './../../services/offer.service';
import { guid } from './../../api/models/guid';
import { GiftsService } from './../../services/gifts.service';
import { BusinessService } from './../../services/business.service';
import { EventsService } from './../../services/events.service';
import { GroupService } from './../../services/group.service';
import { FirebaseService } from './../../services/firebase.service';
import { CustomService } from './../../services/custom.service';

import { Nav, MenuController } from 'ionic-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api/services/api.service';

import { PersonalComponent } from './../../views/personal/personal.component';
import { SocialComponent } from './../../views/social/social.component';
import { ShoppingComponent } from './../../views/shopping/shopping.component';
import { InventoriesComponent } from './../../views/inventories/inventories.component';
import { SettingsComponent } from './../../views/settings/settings.component';
import { UserService } from '../../services/user.service';
import { Notification, User } from '../../api/models';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  providers: [
    LocalNotifications
  ]
})
export class MainMenuComponent implements OnInit {
  @ViewChild(Nav) nav: Nav;
  rootPage = SocialComponent;

  pages: Array<{ title: string, component: any, image: string }>;
  loggin_user: any;
  moodLocal: any;


  constructor(
    public customService: CustomService,
    public menuCtrl: MenuController,
    private api: ApiService,
    private userService: UserService,
    private fbService: FirebaseService,
    private groupService: GroupService,
    private eventService: EventsService,
    private business: BusinessService,
    private giftService: GiftsService,
    private offerService: OfferService,
    private localNotifications: LocalNotifications
  ) {
    // this.moodLocal = [
    //   { guid: '7723', title: 'WANNA_TRADE', image: 'assets/imgs/ic_gift_1.png' },
    //   { guid: '7724', title: 'WANNA_GIFT', image: 'assets/imgs/ic_gift_4.png' },
    //   { guid: '7732', title: 'WANNA_GET', image: 'assets/imgs/ic_gift_3.png' },
    //   { guid: '7733', title: 'WANNA_DATE', image: 'assets/imgs/ic_like.png' },
    // ]
    this.moodLocal = {
      7723: { title: 'Muốn đổi quà', image: 'assets/imgs/ic_gift_1.png', tag: 'wanna_trade', guid: '7723' },
      7724: { title: 'Muốn tặng quà', image: 'assets/imgs/ic_gift_4.png', tag: 'wanna_send', guid: '7724' },
      7732: { title: 'Muốn nhận quà', image: 'assets/imgs/ic_gift_3.png', tag: 'wanna_gift', guid: '7732' },
      7733: { title: 'Muốn hẹn hò', image: 'assets/imgs/ic_like.png', tag: 'wanna_date', guid: '7733' },
    }
    this.customService.mood_local = this.moodLocal;
    localStorage.setItem("mood_local", JSON.stringify(this.moodLocal));
  }

  ngOnInit() {
    this.api.getProfile({}).subscribe(data => {
      localStorage.setItem('loggin_user', JSON.stringify(data));
      this.customService.user_current = data;
      this.pages = [
        { title: this.customService.user_current.fullname, component: PersonalComponent, image: data.avatar },
        { title: 'XÃ HỘI', component: SocialComponent, image: 'assets/imgs/Social.png' },
        { title: 'MUA SẮM', component: ShoppingComponent, image: 'assets/imgs/Shopping.png' },
        { title: 'KHO QUÀ', component: InventoriesComponent, image: 'assets/imgs/Inventory.png' },
        { title: 'THIẾT LẬP', component: SettingsComponent, image: 'assets/imgs/Settings.png' }
      ];
      this.api.getFriends(data.guid).subscribe(d => {
        this.customService.friends = d;
      })
      this.notifyFirebase();
    });

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
        let notify: Notification;
        notify = items.val();

        if (notify.poster_guid)
          this.userService.getUser(null, notify.poster_guid).subscribe(data => {
            notify.from_user = data;

            switch (notify.notification_type) {
              case 'like:post':
                notify.title = data.fullname + 'đã thích bài viết của bạn';
                this.customService.notifications.push(notify);
                this.showNotify(notify.title);
                // console.log('like: post');
                break;
              case "comments:post":
                // console.log("comments:post");
                notify.title = data.fullname + 'đã bình luận viết của bạn';
                this.customService.notifications.push(notify);
                this.showNotify(notify.title);
                break;
              case 'group:inviterequest':
                this.initNotifyGroup(notify, data);
                break;
              case "friend:request":
                // console.log("friend:request");
                notify.title = data.fullname + 'đã gửi lời mời kết bạn';
                this.customService.notifications.push(notify);
                this.showNotify(notify.title);
                break;
              case "gift:request":
                // console.log("gift:request");
                this.initNotifyGift(notify, data);
                break;
              case "gift:accept":
                // console.log("gift:accept");
                this.initNotifyGift(notify, data);
                break;
              case "gift:reject":
                // console.log("gift:reject");
                this.initNotifyGift(notify, data);
                break;
              case "event:member":
                // console.log("event:member");
                this.initNotifyEvent(notify, data)
                break;
              case "event:invite":
                // console.log("event:invite");
                this.initNotifyEvent(notify, data)
                break;
              case "offer":
                // console.log('offer');
                this.initNotifyOffer(notify, data)
                break;
              case "counter":
                // console.log('counter');
                this.initNotifyOffer(notify, data)
                break;
              case "redeem:finished":
                // console.log("redeem:finished");

                break;

            }
          })
        return false;
      });
    })
  }

  initNotifyGroup(notify: Notification, user: User) {
    this.groupService.getGroup(notify.subject_guid).subscribe(data => {
      if (data.guid != null) {
        // console.log('group:inviterequest');
        // console.log(data);
        // console.log('----------------------');
        notify.title = user.fullname + " đã mời bạn vào nhóm " + data.title;
        this.customService.notifications.push(notify);
      }


    })
  }

  initNotifyGift(notify: Notification, user: User) {
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
            this.showNotify(notify.title);
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
            this.showNotify(notify.title);
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
            this.showNotify(notify.title);
          }
          break;
      }
    })
  }

  initNotifyEvent(notify: Notification, user: User) {
    this.eventService.getEvent(notify.subject_guid).subscribe(data => {
      try {
        notify.title = user.fullname + " đã mời bạn tham gia sự kiện " + data.events.title;
        this.customService.notifications.push(notify);
        this.showNotify(notify.title);
      } catch (e) {
      }
    })
  }

  initNotifyOffer(notify: Notification, user: User) {
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
        this.showNotify(notify.title);
      }

    })
  }

  showNotify(txt: string) {
    return new Promise((resolve, reject) => {
      this.localNotifications.schedule({
        id: 1,
        text: txt
      });
    });
  }
}
