import { User } from './../../api/models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { UserComponent } from '../user/user.component';
import { CustomService } from '../../services/custom.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html'
})
export class FriendsComponent implements OnInit {
  @Input('from') from: string;
  @Input('guid') guid;
  @Input('object') obj;
  @Input('dontShow') dontShow: boolean;

  public users: Array<User>;
  public userCurrent: User = new User();
  public isUserCurrent: boolean;
  public friendsUserCurrent: Array<User> = [];
  constructor(public nav: NavController, public appCtrl: App,
    private userService: UserService, private customService: CustomService) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));

  }

  loadData(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.userService.getFriends(this.userCurrent.guid).subscribe(
      data => { this.friendsUserCurrent = data },
      err => { this.loadData(--retry) });
  }
  ngOnInit() {
    switch (this.from) {
      case 'user':
        this.loadFriendProfile(this.guid);
        break;
      case 'group':
        this.loadGroupProfile(this.guid);
        break;

      default:
        break;
    }
  }

  goToPage(value) {
    this.appCtrl.getRootNav().push(UserComponent, { userGuid: value });
  }

  loadFriendProfile(user_guid) {
    this.isUserCurrent = user_guid === this.userCurrent.guid;
    if (!this.dontShow) {
      this.retryLoadFriends(5, user_guid);
    }
  }

  retryLoadFriends(retry, user_guid) {
    if (retry == 0) return;
    this.userService.getFriends(user_guid).subscribe(
      data => {
        if (data instanceof Array) this.users = data;
        else this.users = [];
      },
      err => this.retryLoadFriends(--retry, user_guid));
  }
  isFriend(userGuid) {
    if (userGuid === this.userCurrent.guid) return 0;
    else if (this.friendsUserCurrent.find(e => e.guid === userGuid) !== undefined) return 1;
    else return 2;
  }

  loadGroupProfile(groupGuid) {
    this.users = this.obj.members;
  }

  isGroupAdmin(guid) {
    if (this.obj.owner_guid === guid) return true;
    return false;
  }
}
