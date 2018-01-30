import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class MessagesService {

  userCurrent: any;
  individualList: any;
  message: { from: string, status: string, text: any, time: number };

  constructor(
    public afDatabase: AngularFireDatabase,
    public userService: UserService
  ) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
   }

  getUsersChat() {
    let path = "/users/" + this.userCurrent.username + "/chat/";
    return this.afDatabase.list(path + "individual").query.orderByChild('last_read').startAt(1);
  }

  getGroupsChat() {
    let path = "/users/" + this.userCurrent.username + "/chat/";
    return this.afDatabase.list(path + "group");
  }

  getMessages(keyChat) {
    let path = "/shared/messages/" + keyChat ;
    return this.afDatabase.list(path);
  }

  getLastMessage(keyChat) {
    let path = "/shared/messages/" + keyChat;
    return this.afDatabase.list(path).query.orderByChild('time').limitToLast(1);
  }

  sendMessage(message, keyChat) {
    let path = "/shared/messages/" + keyChat;
    return this.afDatabase.list(path).push(message);
  }
}
