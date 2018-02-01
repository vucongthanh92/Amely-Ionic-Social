import { Event } from './../../../api/models/event';
import { Group } from './../../../api/models/group';
import { User } from './../../../api/models/user';
import { EventsService } from './../../../services/events.service';
import { GroupService } from './../../../services/group.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { InventoryComponent } from '../../../components/inventory/inventory.component';

@Component({
  selector: 'app-inventory-public',
  templateUrl: './inventory-public.component.html',
})
export class InventoryPublicComponent implements OnInit {
  public events: Array<Event> = [];
  public usersEvent: Array<User> = [];
  public usersGroup: Array<User> = [];
  public groups: Array<Group> = [];
  public userCurrent: User;

  constructor(public nav: NavController, public appCtrl: App, private groupService: GroupService, private eventsService: EventsService) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
  }

  ngOnInit() {
    this.groupService.getGroups(this.userCurrent.guid).subscribe(data => {
      if (data.groups) {
        this.groups = data.groups
      }
      if (data.owners) {
        this.usersGroup = data.owners;
      }
    });

    this.eventsService.getEvents(0, 9999, 'all').subscribe(data => {
      if (data.events) {
        this.events = data.events;
      }
      if (data.users) {
        this.usersEvent = data.users;
      }
    });
  }

  getAdminGroup(guid) {
    return this.usersGroup[guid].fullname;
  }
  inventoryPublicTab = 'group';
  groupPage = true;
  eventPage = false;

  goToPage(value) {
    switch (value) {
      case 'group':
        this.groupPage = true;
        this.eventPage = false;
        break;
      case 'event':
        this.groupPage = false;
        this.eventPage = true;
        break;
      case 'gift':
        this.appCtrl.getRootNav().push(InventoryComponent);
        break;
      default:
        break;
    }
  }

}
