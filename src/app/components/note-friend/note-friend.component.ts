import { FirebaseService } from './../../services/firebase.service';
import { CustomService } from './../../services/custom.service';
import { Event } from './../../api/models/event';
import { Group } from './../../api/models/group';
import { User } from './../../api/models/user';
import { InvitationService } from './../../services/invitation.service';
import { Component, OnInit } from '@angular/core';
import { DefaultResponse } from '../../api/models';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'app-note-friend',
  templateUrl: './note-friend.component.html'
})
export class NoteFriendComponent implements OnInit {
  users: Array<User>;
  groups: Array<Group>;
  events: Array<Event>

  constructor(private invitationService: InvitationService, private customService: CustomService, private fbService: FirebaseService,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadData(5);
  }

  loadData(retry) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();

    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.invitationService.getInvatitions().subscribe(
      data => {
        loading.dismiss();
        if (data.users && data.users.length > 0) this.users = data.users;
        if (data.groups && data.groups.length > 0) this.groups = data.groups;
        if (data.events && data.events.length > 0) this.events = data.events;
      },
      err => {
        this.loadData(--retry)
      });
  }

  accept(type, to_guid, username) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();

    this.retryPutApproval(5, type, to_guid, loading, username);

  }

  retryPutApproval(retry, type, to_guid, loading, username) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.invitationService.putApproval(type, null, to_guid).subscribe(data => {
      loading.dismiss();
      this.hanldeAcceptOrCancelRequest(true, data, type, to_guid, username);
    }, err => this.retryPutApproval(--retry, type, to_guid, loading, username))
  }

  cancel(type, to_guid) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();

    this.retryDeleteApproval(5, type, to_guid, loading)
  }

  retryDeleteApproval(retry, type, to_guid, loading) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.invitationService.deleteApproval(type, null, to_guid).subscribe(data => {
      loading.dismiss();
      this.hanldeAcceptOrCancelRequest(false, data, type, to_guid, null);
    }, err => this.retryDeleteApproval(--retry, type, to_guid, loading))
  }
  hanldeAcceptOrCancelRequest(isAccept, data: DefaultResponse, type, to_guid, username) {
    if (data.status) {
      this.customService.toastMessage('Thành công', 'bottom', 2000);
      switch (type) {
        case 'user':
          this.users = this.users.filter(e => e.guid != to_guid);
          if (isAccept) {
            this.createFirebaseAcceptAddFriend(username);
          }
          break;
        case 'group':
          if (isAccept) {
            this.fbService.createKey('group', this.customService.user_current.username, to_guid + '', { key: to_guid + '', last_read: 0, unread_count: 0 })
          }
          this.groups = this.groups.filter(e => e.guid != to_guid)
          break;
        case 'event':
          this.events = this.events.filter(e => e.guid != to_guid)
          break;
      }
    } else {
      this.customService.toastMessage('Thất bại !', 'bottom', 2000);
    }
  }

  createFirebaseAcceptAddFriend(userChat) {
    this.fbService.findKeyChat(userChat, this.customService.user_current.username).once("value", snap => {
      const message = { from: this.customService.user_current.username, status: "Đang gửi", text: 'Đã đồng ý yêu cầu kết bạn .', time: Date.now() };
      console.log(snap.val());
   
      
      if (snap.val() == null) {
        
        const key = this.fbService.createKeyFirebase();
        const individual = { key: key, last_read: Date.now(), unread_count: 0 }
        this.fbService.insertIndividual(this.customService.user_current.username, userChat, individual);
        this.fbService.insertIndividual(userChat, this.customService.user_current.username, individual);
        this.fbService.getMessages(key).push(message);
        console.log(key);
      } else {
        const key = snap.val().key;
        console.log(key);
        this.fbService.getMessages(key).push(message);
      }
    })
  }
}
