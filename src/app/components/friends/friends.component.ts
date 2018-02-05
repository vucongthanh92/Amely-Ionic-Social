import { guid } from './../../api/models/guid';
import { User } from './../../api/models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html'
})
export class FriendsComponent implements OnInit {
  @Input('from') from: string;
  @Input('guid') guid;
  @Input('object') obj;

  public users: Array<User>;
  public userCurrent: User = {};
  public isUserCurrent: boolean;
  public friendsUserCurrent: Array<User> = [];
  constructor(public nav: NavController, public appCtrl: App,
    private userService: UserService) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
    this.userService.getFriends(this.userCurrent.guid).subscribe(data => this.friendsUserCurrent = data);
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

    this.userService.getFriends(user_guid).subscribe(data => { this.users = data; });

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
    if(this.obj.owner_guid===guid)return true;
    return false;
  }
}
