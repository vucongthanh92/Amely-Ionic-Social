import { User } from './../../api/models/user';
import { Component, OnInit, Input } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-feed',
  templateUrl: './add-feed.component.html'
})
export class AddFeedComponent implements OnInit {

  @Input('content') content: string;
  public is_show_tag: boolean;
  public is_show_autocomplete: boolean = false;
  public users: Array<User>;
  public usersTmp: Array<User>;
  public usersTag: Array<User> = [];
  constructor(public nav: NavController, public appCtrl: App, private userService: UserService) { }

  ngOnInit() {
    this.userService.getFriends(null).subscribe(data => {
      this.users = data;
      this.usersTmp = data;
    })
  }

  showTagFriend() {
    this.is_show_tag = !this.is_show_tag;
  }

  chooseUserTag(user: User) {
    this.usersTag.push(user);
    this.content = '';
    this.is_show_autocomplete = false;
  }

  removeUserTag(user: User) {
    this.usersTag = this.usersTag.filter(e => e.guid != user.guid);
  }

  getItems(ev: any) {
    let val = ev.target.value;
    this.usersTmp = this.users;
    if (val && val.trim() != '') {
      this.is_show_autocomplete = true;
      this.usersTmp = this.usersTmp.filter((item) => {
        return (item.fullname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.is_show_autocomplete = false;
    }
  }
}
