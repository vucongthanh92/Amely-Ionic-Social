import { UserComponent } from './../user/user.component';
import { CustomService } from './../../services/custom.service';
import { EventsService } from './../../services/events.service';
import { EventMenuComponent } from './event-menu/event-menu.component';
import { NavController, App, NavParams, PopoverController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Event, User } from '../../api/models';
import { logger } from '@firebase/database/dist/esm/src/core/util/util';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html'
})

export class EventComponent implements OnInit {
  public is_user: boolean = false;;
  public event_guid: number;
  public event: Event;
  public users: User[];
  public string_members: Array<string>;
  public string_guests: Array<string>;
  constructor(public nav: NavController, public appCtrl: App, private navParams: NavParams, public popoverCtrl: PopoverController, public eventService: EventsService, private customService: CustomService) {
    // this.is_user = navParams.get('is_user');
    this.event_guid = navParams.get('event_guid');
  }

  ngOnInit() {
    this.eventService.getEvent(this.event_guid).subscribe(data => {
      if (data.events.guid != null) {
        this.is_user = this.customService.user_current.guid == data.events.owner_user;
        this.event = data.events;
        this.users = data.users;
        this.string_guests = this.event.invites.split(',');
        this.string_members = this.event.members.split(',');

        if (this.event.status == "1" && this.event.published == "1") {
          this.eventService.publish = 0;
        } else if (this.event.status == "2" && this.event.published == "1") {
          this.eventService.publish = 1;
        } else if (this.event.status == "2" && this.event.published == "2") {
          this.eventService.publish = 2;
        } else if (this.event.status == "1" && this.event.published == "2") {
          this.eventService.publish = 3;
        }

      }
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

        break;
      case 'chat':

        break;
      default:
        break;
    }
  }
  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(EventMenuComponent, { event: this.event });
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
    return this.event.members.split(',').length + this.event.invites.split(',').length;
  }
  openUserProfile(u: User) {
    this.appCtrl.getRootNav().push(UserComponent, { userGuid: u.guid })
  }
}
