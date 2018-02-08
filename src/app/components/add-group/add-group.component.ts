import { User } from './../../api/models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { CustomService } from '../../services/custom.service';
import { GroupService } from '../../services/group.service';


@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html'
})
export class AddGroupComponent implements OnInit {
  @Input('has_inventory') has_inventory: boolean;
  @Input('group_name') group_name: string;
  public friends: Array<User>;
  public users_choosed: Array<User> = [];

  constructor(public nav: NavController, public appCtrl: App, private navParams: NavParams, private user_serive: UserService,private custom_service:CustomService
  ,private group_service:GroupService) { }

  ngOnInit() {
    this.user_serive.getFriends(null).subscribe(data => {
      if (data instanceof Array) {
        this.friends = data;
      }
    })
  }
  chooseUser(user: User) {
    this.friends = this.friends.filter(e => e.guid != user.guid);
    if (!this.users_choosed.some(e => e.guid == user.guid)) {
      this.users_choosed.unshift(user);
    }
  }
  removeUser(user: User) {
    this.users_choosed = this.users_choosed.filter(e => e.guid != user.guid);
    if (!this.friends.some(e => e.guid == user.guid)) {
      this.friends.unshift(user);
    }
  }
  createGroup() {
    if (!this.group_name) {
      this.custom_service.toastMessage('Tên nhóm không hợp lệ !','bottom',2000)
    }else{
      // name: string, description: string, privacy: string, member_invite: string, membership: string, has_inventory: string, members: string[]
      let user_guids=[];
      this.users_choosed.forEach(e => {
        user_guids.push(e.guid);
      });
      console.log(this.group_name);
      
      console.log(user_guids);
      console.log(this.has_inventory ? "2" : "");
      
      // this.group_service.putGroup(this.group_name, "", "2", "2", "3", this.has_inventory ? "2":"",[1,2,3]);
    }


  }

 
}
