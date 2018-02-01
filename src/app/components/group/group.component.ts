import { Group } from './../../api/models/group';
import { GroupService } from './../../services/group.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { MessageComponent } from '../message/message.component';
import { GiftComponent } from '../gift/gift.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html'
})
export class GroupComponent implements OnInit {

  groupGuid: string;
  feed_type = "group";
  group: Group ;
  groups = [];
  dateCreated: Date;

  constructor(public nav: NavController, public appCtrl: App, private navParams: NavParams, private groupService: GroupService) {
    this.groupGuid = this.navParams.get('groupGuid');
    this.groupService.getGroup(this.groupGuid).subscribe(data => {
      this.groups.push(data);
      this.group = data;
      console.log(this.group.avatar);
      this.dateCreated = new Date(this.group.time_created * 1000);
    })
   }

  ngOnInit() {
  }

  newfeedsPage = true;
  membersPage = false;
  groupTab = 'newfeed';

  getOwner(guid) {
    if (guid) {
      return this.group.members.find(x => x.guid == guid).fullname;
    }
  }
  goToPage(value) {
    switch (value) {
      case 'newfeed':
        this.newfeedsPage = true;
        this.membersPage = false;
        break;
      case 'members':
        this.newfeedsPage = false;
        this.membersPage = true;
        break;
      case 'gift':
        this.appCtrl.getRootNav().push(GiftComponent);
        break;
      case 'chat':
        this.appCtrl.getRootNav().push(MessageComponent);
        break;
      default:
        break;
    }
  }
}
