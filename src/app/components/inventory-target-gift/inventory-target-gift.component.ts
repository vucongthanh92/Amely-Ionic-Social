import { InventoryConfirmGiftComponent } from './../inventory-confirm-gift/inventory-confirm-gift.component';
import { GroupService } from './../../services/group.service';
import { Group } from './../../api/models/group';
import { User } from './../../api/models/user';
import { CustomService } from './../../services/custom.service';
import { UserService } from './../../services/user.service';
import { NavParams, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory-target-gift',
  templateUrl: './inventory-target-gift.component.html'
})
export class InventoryTargetGiftComponent implements OnInit {

  user_list: User[];
  group_list: Group[];

  constructor(
    private customService: CustomService,
    private groupService: GroupService,
    private userService: UserService,
    private nav: NavController,
    private navParams: NavParams
  ) {
    let type = this.navParams.get('param');
    console.log('target');
    console.log(this.navParams.get('item'));

    switch (type) {
      case 'users':
        this.retryGetUser(5);
        console.log('user');
        break;
      case 'groups':
        this.retryGetGroup(5);
        console.log('group');
        break;
      case 'businesses':
        console.log('business');
        break;
      case 'events':
        console.log('event');
        break;
      default:
        break;
    }
  }

  retryGetGroup(retry) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.groupService.getGroups(this.customService.user_current.guid).subscribe(data => {
      this.group_list = data.groups;
    }, err => this.retryGetGroup(--retry));
  }

  retryGetUser(retry) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.userService.getFriends(this.customService.user_current.guid).subscribe(data => {
      this.user_list = data;
    }, err => this.retryGetUser(--retry));
  }
  ngOnInit() {
  }

  // changePageConfirm(group, 'group')
  changePageConfirm(obj, type) {
    this.nav.push(InventoryConfirmGiftComponent, { param: obj, type: type, item: this.navParams.get('item') });
  }

}
