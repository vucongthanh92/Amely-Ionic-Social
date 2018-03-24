import { CustomService } from './../../../services/custom.service';
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

  constructor(public nav: NavController, public appCtrl: App, private groupService: GroupService, private eventsService: EventsService, private customService: CustomService) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
  }

  ngOnInit() {
    this.loadData(15);
  }

  loadData(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.groupService.getGroups(this.userCurrent.guid).subscribe(data => {
      if (data.groups) {
        this.groups = data.groups.filter(e => e.has_inventory === '2')
      }
      if (data.owners) {
        this.usersGroup = data.owners;
      }
    }, err => this.loadData(--retry));

    this.eventsService.getEvents(0, 9999, 'all').subscribe(data => {
      if (data.events) {
        this.events = data.events.filter(e => e.has_inventory === '1');

      }
      if (data.users) {
        this.usersEvent = data.users;
      }
    }, err => this.loadData(--retry));
  }

  getFullnameAdmin(guid, type) {
    switch (type) {
      case 'group':
        return this.usersGroup[guid].fullname;
      case 'event':
        return this.usersEvent[guid].fullname;
      default:
        return 'Đang cập nhật';
    }

  }
  inventoryPublicTab = 'group';
  groupPage = true;
  eventPage = false;

  goToPage(value, type, guid, obj) {
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
        if (type == 'event') {
          obj.owner = this.usersEvent[obj.owner_guid];
        } else if (type == "group") {
          obj.owner = this.usersGroup[obj.owner_guid];

        }
        this.appCtrl.getRootNav().push(InventoryComponent, { type: type, ownerGuid: guid, obj: obj });
        break;
      default:
        break;
    }
  }

}
