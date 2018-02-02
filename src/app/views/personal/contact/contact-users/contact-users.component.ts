import { User } from './../../../../api/models/user';
import { PersonalService } from './../../personal.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { UserComponent } from '../../../../components/user/user.component';
import { MessageComponent } from '../../../../components/message/message.component';

@Component({
  selector: 'app-contact-users',
  templateUrl: './contact-users.component.html'
})
export class ContactUsersComponent implements OnInit {
  private userCurrent: User;
  private moodLocal: any;
  public friends: Array<User>; constructor(public nav: NavController, public appCtrl: App, private personalService: PersonalService) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
    this.moodLocal = JSON.parse(localStorage.getItem("mood_local"));
  }

  ngOnInit() {
    this.getFriends();
  }

  goToPage(friend: any) {
    this.appCtrl.getRootNav().push(UserComponent, { userGuid: friend.guid });
  }

  goToPageChat() {
    this.appCtrl.getRootNav().push(MessageComponent);
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
