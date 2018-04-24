import { MessagesService } from './../../services/messages.service';
import { User } from './../../api/models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { App, NavController, LoadingController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { CustomService } from '../../services/custom.service';
import { GroupService } from '../../services/group.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html'
})
export class AddGroupComponent implements OnInit {
  @Input('has_inventory') has_inventory: boolean;
  @Input('group_name') group_name: string;

  public isLoading
  public friends: Array<User>;
  public users_choosed: Array<User> = [];

  constructor(public nav: NavController, public appCtrl: App, private navParams: NavParams, private user_serive: UserService, private custom_service: CustomService
    , private group_service: GroupService, private messagesService: MessagesService, public afDatabase: AngularFireDatabase, public loadingCtrl: LoadingController) { }

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
  createAGroup() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loading.present();
    if (!this.group_name) {
      loading.dismiss();
      this.custom_service.toastMessage('Tên nhóm không hợp lệ !', 'bottom', 2000)
    } else {
      let user_guids = [];
      let usernames = [this.custom_service.user_current.username];
      this.users_choosed.forEach(e => {
        user_guids.push(e.guid);
        usernames.push(e.username);
      });

      this.group_service.putGroup(this.group_name, '', '2', '2', '3', this.has_inventory ? '2' : '', user_guids).subscribe(data => {
        if (data.group_guid) {
          this.messagesService.createKeyChat("group", this.custom_service.user_current.username, data.group_guid + '', { key: data.group_guid + '', last_read: 0, unread_count: 0 });
          let path = "/shared/groups";
          let obj = { guid: data.group_guid + '', members: usernames, name: this.group_name, owner: this.custom_service.user_current.username }
          this.afDatabase.list(path).set(data.group_guid + '', obj);
          let callback = this.navParams.get("callback");

          callback({ type: 'reload' }).then(() => {
            this.nav.pop();
            loading.dismiss();   
          });
                         
        }
      });

    }
  }


}
