import { GroupService } from './../../../services/group.service';
import { MessagesService } from './../../../services/messages.service';
import { User } from './../../../api/models/user';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { MessageComponent } from '../../../components/message/message.component';
import { UserService } from '../../../services/user.service';
import { Group } from '../../../api/models/group';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit {

  users: User[];
  user: User;
  userCurrent: User;
  groups: Group[];
  individualList: any;
  dataSnapshot: any;

  constructor(
    public groupService: GroupService,
    public messagesService: MessagesService,
    public userService: UserService,
    public nav: NavController,
    public appCtrl: App) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
    
  }

  ngOnInit() {
     
  }

  
  ionViewDidLoad() {
    this.messagesService.getUsersChat().on('value', itemSnap => {
      this.individualList = [];
      itemSnap.forEach( items => {
        this.messagesService.getLastMessage(items.val().key).on('value', lastmessage => {
          lastmessage.forEach(e => {
            let object = e.val();
            object.key = items.val().key;
            object.from = items.key;
            this.individualList = this.individualList.filter(data => data.key != object.key);
            this.userService.getUser(object.from, null).subscribe(data => {
              object.avatar = data.avatar;
              object.guid = data.guid;
            });
            this.individualList.push(object);
            this.individualList.sort(this.compare);
            return false;
          });
        });
        return false;
      });
    });

    this.groupService.getGroups(this.userCurrent.guid).subscribe( data => {
      this.groups = [];
      data.groups.forEach( group => {
        this.messagesService.getLastMessage(group.guid).on('value', lastmessage => {
          lastmessage.forEach(e => {
            group.last_message = e.val().text;
            group.last_time = e.val().time;
            this.groups = this.groups.filter(data => data.guid != group.guid);
            this.groups.push(group);
            this.groups.sort(this.compare);
            return false;
          });
        });
        return false;
      });
      this.users = data.owners;
    });
  }

  goToPage(value) {
    this.nav.push(MessageComponent, { param: value });
  }

  compare(a, b) {
    if (a.time > b.time)
      return -1;
    if (a.time < b.time)
      return 1;
    return 0;
  }
}
