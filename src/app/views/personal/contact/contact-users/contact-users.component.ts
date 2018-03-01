import { MessagesService } from './../../../../services/messages.service';
import { User } from './../../../../api/models/user';
import { PersonalService } from './../../personal.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { UserComponent } from '../../../../components/user/user.component';
import { MessageComponent } from '../../../../components/message/message.component';
import { AddGroupComponent } from '../../../../components/add-group/add-group.component';

@Component({
  selector: 'app-contact-users',
  templateUrl: './contact-users.component.html'
})
export class ContactUsersComponent implements OnInit {
  
  private userCurrent: User;
  private moodLocal: any;
  public friends: Array<User>; 

  constructor(
    public messagesService: MessagesService,
    public nav: NavController, 
    public appCtrl: App, 
    private personalService: PersonalService) 
    {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
    this.moodLocal = JSON.parse(localStorage.getItem("mood_local"));
  }

  ngOnInit() {
    this.getFriends();
  }

  goToPage(friend: any) {
    this.appCtrl.getRootNav().push(UserComponent, { userGuid: friend.guid });
  }

  addFriend() {
    // this.appCtrl.getRootNav().push(AddGroupComponent, { callback: this.myCallbackFunction });
  }

  goToPageChat(friend, chat_type) {
    this.messagesService.getKeyChat(this.userCurrent.username, friend.username, "individual").query.once('value', snap => {
      let key = "";
      if (snap.val() == null) {
        this.messagesService.getKeyChat(friend.username, this.userCurrent.username, "individual").query.once('value', item => {
          if (item.val()) {
            key = item.val().key;
            this.messagesService.createKeyChat("individual", this.userCurrent.username, friend.username, item.val()); 
            friend.key = key;
            friend.chat_type = "individual";
            this.appCtrl.getRootNav().push(MessageComponent, { param: friend });
          } else {
            key = this.messagesService.generateKey();
            let obj = { key: key, last_read: 0, unread_count: 0 };
            this.messagesService.createKeyChat("individual", this.userCurrent.username, friend.username, obj);
            this.messagesService.createKeyChat("individual", friend.username, this.userCurrent.username, obj);
            friend.key = key;
            friend.chat_type = "individual";
            this.appCtrl.getRootNav().push(MessageComponent, { param: friend });
          }
        });
      } else {
        key = snap.val().key;
        friend.key = key;
        friend.chat_type = "individual";
        this.appCtrl.getRootNav().push(MessageComponent, { param: friend});
      }
    });
  }

  getFriends() {
    this.personalService.getFriends(this.userCurrent.guid).subscribe(data => {
      this.friends = data;
    });
  }

  getThought(thought: string) {
    if (thought.indexOf('_=-_tln$@ttonh!i~tki^abg*la_0@896428_=-!75@-=_=-ahihi=))') != -1 || thought.indexOf("null:data") != -1)
      return '';
    return thought;
  }
  getMoodIcon(moodID){
    return this.moodLocal[moodID] ;
  }
}
