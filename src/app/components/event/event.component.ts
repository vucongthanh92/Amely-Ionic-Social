import { UserComponent } from './../user/user.component';
import { CustomService } from './../../services/custom.service';
import { EventsService } from './../../services/events.service';
import { EventMenuComponent } from './event-menu/event-menu.component';
import { NavController, App, NavParams, PopoverController, LoadingController } from 'ionic-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Event, User } from '../../api/models';
import { GiftComponent } from '../gift/gift.component';
import { FeedsComponent } from '../feeds/feeds.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html'
})

export class EventComponent implements OnInit {
  //intent form event user ,guest =true , history = false
  public type: string;;
  public is_show_fab: boolean = false;;
  public event_guid: number;
  public event: Event;
  public users: User[];
  public string_members: Array<string>;
  public string_guests: Array<string>;
  @ViewChild('feeds') feeds: FeedsComponent;
  callback: any;
  constructor(public nav: NavController, public appCtrl: App, private navParams: NavParams, public popoverCtrl: PopoverController,
    public eventService: EventsService, private customService: CustomService, public loadingCtrl: LoadingController) {
    // this.is_user = navParams.get('is_user');
    this.event_guid = this.navParams.get('event_guid');
    this.callback = this.navParams.get('callback');
  }

  ngOnInit() {
    this.loadData(5)
  }

  loadData(retry) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();
    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage("Kết nối máy chủ thất bại. Vui lòng thử lại", 'bottom', 4000);
      return;
    }
    this.eventService.getEvent(this.event_guid).subscribe(
      data => {
        if (data.events.guid != null) {
          this.event = data.events;
          this.users = data.users;
          this.string_guests = this.event.invites_accepted.split(',');
          this.string_members = this.event.members_accepted.split(',');
          this.type = this.setShowMenu(data.events);
          if (this.event.status == "1" && this.event.published == "1") {
            this.eventService.publish = 0;
          } else if (this.event.status == "2" && this.event.published == "1") {
            this.eventService.publish = 1;
          } else if (this.event.status == "2" && this.event.published == "2") {
            this.eventService.publish = 2;
          } else if (this.event.status == "1" && this.event.published == "2") {
            this.eventService.publish = 3;
          }
          loading.dismiss();
          console.log(this.customService.user_current.guid);
          console.log(data.events.owner_user);
          console.log(data.events.members_accepted);
          console.log(data.events.invites_accepted);

          if (data.events.owner_user == this.customService.user_current.guid) {
            this.is_show_fab = true;
          } else if (data.events.members_accepted && data.events.members_accepted.length > 0) {
            this.is_show_fab = data.events.members_accepted.split(",").some(e => this.customService.user_current.guid + "" == e)
          } 
          if (data.events.invites_accepted && data.events.invites_accepted.length > 0 && !this.is_show_fab) {
            this.is_show_fab = data.events.invites_accepted.split(",").some(e => this.customService.user_current.guid + "" == e)
          }
          console.log(this.is_show_fab);

        }
      },
      err => {
        this.loadData(--retry);
      })
  }
  newfeedsPage = true;
  membersPage = false;
  eventTab = 'newfeed';

  goToPage(type, value) {
    switch (type) {
      case 'newfeed':
        this.newfeedsPage = true;
        this.membersPage = false;
        break;
      case 'members':
        this.newfeedsPage = false;
        this.membersPage = true;
        break;
      case 'gift':
        value.chat_type = "event";
        value.from = this.customService.user_current.username;
        value.to = this.event.title;
        console.log(value);
        this.nav.push(GiftComponent, { param: value });
        break;
      default:
        break;
    }
  }
  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(EventMenuComponent, { event: this.event, type: this.type, callback: this.callbackAvatarCover, callbackreload: this.callbackReload });
    popover.present({
      ev: myEvent
    });
  }

  convertDate(time: number) {
    return new Date(time * 1000);
  }
  getUser(guid: number) {

    return this.users[guid];
  }
  countMember() {
    let countMembers = this.event.members_accepted.split(',')[0] == "" ? 0 : this.event.members_accepted.split(',').length;
    let countGuest = this.event.invites_accepted.split(',')[0] == "" ? 0 : this.event.invites_accepted.split(',').length;
    // total guest + total member + 1 (event owner)
    return countGuest + countMembers + 1;
  }
  openUserProfile(u: User) {
    this.appCtrl.getRootNav().push(UserComponent, { userGuid: u.guid })
  }

  setShowMenu(event: Event) {
    const guests: string[] = JSON.parse("[" + event.invites_accepted + "]");
    const members: string[] = JSON.parse("[" + event.members_accepted + "]");
    // const usercurrent: User = this.customService.user_current;
    if (new Date().getTime() > event.end_date * 1000) {
      return 'history';
    } else if (guests.some(e => e == this.customService.user_current.guid + "")) {
      return "guest";
    } else if (members.some(e => e == this.customService.user_current.guid + "") || this.event.creator.guid == this.customService.user_current.guid) {
      return "member";
    } else {
      return "visitor";
    }
  }

  addFeed() {
    this.feeds.addNewFeed()
  }

  dismiss() {
    this.nav.pop();
  }

  callbackAvatarCover = (_params) => {
    return new Promise((resolve, reject) => {
      // const url: string = _params.url;
      // const isAvatar: boolean = _params.isAvatar;
      // isAvatar ? this.page.avatar = url : this.page.cover = url;
      let loading = this.loadingCtrl.create({
        content: 'Please wait...',
        enableBackdropDismiss: true
      });

      loading.present();
      setTimeout(() => {
        loading.dismiss();
        this.loadData(5)
      }, 4000);
      resolve();
    });
  }
  callbackReload = (_params) => {
    return new Promise((resolve, reject) => {
      try {
        this.callback().then(() => {
          this.nav.pop();
        });
      } catch (error) {

      }


      resolve();
    });
  }


}
