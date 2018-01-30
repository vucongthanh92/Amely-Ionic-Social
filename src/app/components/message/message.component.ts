import { User } from './../../api/models/user';
import { MessagesService } from './../../services/messages.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { GiftComponent } from '../gift/gift.component';
import { ToastController } from 'ionic-angular';
import { Content } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})

export class MessageComponent implements OnInit {

  userCurrent: User;
  param: any;
  messages: any;
  messageText = null;

  @ViewChild(Content) content: Content

  constructor(
    private imagePicker: ImagePicker,
    private toastCtrl: ToastController,
    public messagesService: MessagesService,
    public navParams: NavParams,
    public nav: NavController, 
    public appCtrl: App) 
    {
      this.imagePicker.getPictures({}).then((results) => {
        for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
        }
      }, (err) => { });
      this.param = this.navParams.get("param");
      this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
      this.messagesService.getMessages(this.param.key).query.on("value", itemsSnapshot => {
        this.messages = [];
        let checkAvatarSender = "";
        itemsSnapshot.forEach( items => {
          if (items.hasChildren()) {
            let object = items.val();
            if (object.attachment) {
              let sender = this.userCurrent.username;
              if (object.from == this.userCurrent.username ) {
                object.isSender = true;
                sender = this.param.from;
              }
              let subjectId = object.attachment.url;
              this.messagesService.getGift(subjectId, sender).on('value', gift => {
                gift.forEach(g => {
                  object.gift = g.val();
                  return false;
                });
              });
            }
            if (object.from == this.userCurrent.username) {
              object.isSender = true;
            } else {
              object.isSender = false;
            }
            if (object.from == checkAvatarSender) {
              object.avatar = false;
            } else {
              if (object.from == this.userCurrent.username) {
                object.avatar = this.userCurrent.avatar;
              } else {
                object.avatar = this.param.avatar;
              }
              checkAvatarSender = object.from;
            }
            object.time = new Date(object.time);
            this.messages.push(object);
            // this.content.scrollToBottom(0);
          }
          return false;
        });
        setTimeout(() => {
          this.content.scrollToBottom(500);
        }, 500);
      });
  }

  ionViewDidLoad() {
    // this.content.scrollToBottom(0);
  }
  ionViewWillEnter() {
    // this.content.scrollToBottom(0);
  }
  ionViewDidEnter() {
    this.content.scrollToBottom(500);
  }
  ngOnInit() {
    // this.content.scrollToBottom(0);    
  }
  
  sendMessage() {
    if (this.messageText) {
      let message = { from: this.userCurrent.username, status: "Đang gửi", text: this.messageText, time: Date.now() };
      this.messagesService.sendMessage(message, this.param.key);
    } else {
      const toast = this.toastCtrl.create({
        message: 'Không có nội dung gửi!',
        position: "bottom",
        duration: 1000
      });
      toast.present();
    }
    this.messageText = null;
  }

  newfeedsPage = true;
  membersPage = false;
  groupTab = 'newfeed';

  goToPage(value) {
    switch (value) {
      case 'gift':
        this.appCtrl.getRootNav().push(GiftComponent);
        break;
      default:
        break;
    }
  }

}
