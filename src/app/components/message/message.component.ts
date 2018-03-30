import { GiftsService } from './../../services/gifts.service';
import { Camera } from '@ionic-native/camera';
import { User } from './../../api/models/user';
import { MessagesService } from './../../services/messages.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { App, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GiftComponent } from '../gift/gift.component';
import { ToastController } from 'ionic-angular';
import { Content } from 'ionic-angular';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { Item } from '../../api/models/item';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})

export class MessageComponent implements OnInit {

  userCurrent: User;
  param: any;
  messages: any;
  messageText = null;
  Picture: any;
  base64Image: any;
  usernameChat: string;
  item: Item;
  gift: any;

  @ViewChild(Content) content: Content

  constructor(
    public giftsService: GiftsService,
    public firebase: FirebaseApp,
    public cameraPlugin: Camera,
    private toastCtrl: ToastController,
    public messagesService: MessagesService,
    public navParams: NavParams,
    public nav: NavController, 
    public appCtrl: App,
    public loadingCtrl: LoadingController) 
    {
      this.param = this.navParams.get("param");
      console.log(this.param);
      console.log('1234');
      
      this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
      if (this.param.chat_type == "individual") {
        this.getMessagesIndividual();
        this.usernameChat = this.param.from;
      } else {
        this.getMessagesGroup();
        this.usernameChat = this.param.title;
      }
  }

  getMessagesIndividual() {
    this.messagesService.getMessages(this.param.key).query.on("value", itemsSnapshot => {
      this.messages = [];
      let checkAvatarSender = "";
      itemsSnapshot.forEach(items => {
        if (items.hasChildren()) {
          let object = items.val();
          if (object.attachment) {
            switch (object.attachment.media_type) {
              case 'gift':
                let owner_gift = [this.param.from, this.param.to].filter(data => data != object.from);
                this.messagesService.getGift(object.attachment.url, owner_gift[0]).on('value', gift => {
                  gift.forEach(g => {
                    object.gift = g.val();
                    return false;
                  });
                });
                break;
              case 'image':
                break;
              default:
                break;
            }
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
          object.chat_type = "individual";
          this.messages.push(object);
        }
        return false;
      });
    });
  }

  getMessagesGroup() {
    let owner = this.param.members.filter(data => data.guid == this.param.owner_guid);
    let owner_username = owner[0].username;
    this.messagesService.getMessages(this.param.guid).query.on("value", itemsSnapshot => {
      this.messages = [];
      let checkAvatarSender = "";
      itemsSnapshot.forEach( items => {
        if (items.hasChildren()) {
          let object = items.val();
          if (object.attachment) {
            switch (object.attachment.media_type) {
              case 'gift':
                this.messagesService.getGift(object.attachment.url, this.userCurrent.username).on('value', gift => {
                  gift.forEach(g => {
                    if (g.val().item_guid) {
                      object.gift = g.val();
                      if (object.from == owner_username) {
                        object.gift.owner = true;
                      }
                    }
                    return false;
                  });
                });
                break;
              case 'image':
                break;
              default:
                break;
            }
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
              let member = this.param.members.filter(data => data.username == object.from);
              if (member.length > 0) {
                object.avatar = member[0].avatar;
              } else {
                object.avatar = "assets/default/avatar.png";
              }
            }
            checkAvatarSender = object.from;
          }
          object.time = new Date(object.time);
          object.chat_type = "group";
          this.messages.push(object);
          if (this.messages.length > 0) {
            setTimeout(() => {
              this.content.scrollToBottom(500);
            }, 1000);
          }
        }
        return false;
      });
    });
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.content.scrollToBottom(500);
    }, 500);
  }

  selectFromGallery() {
    this.messagesService.selectFromGallery(this.param.key);
  }

  takePicture() {
    this.messagesService.takePicture(this.param.key);
  }

  ngOnInit() { 
  }
  
  sendMessage() {
    
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();
    if (this.messageText) {
      let message = { from: this.userCurrent.username, status: "Đang gửi", text: this.messageText, time: Date.now() };
      this.messagesService.sendMessage(message, this.param.key);
      // setTimeout(() => {
      //   this.content.scrollToBottom(100);
      // }, 1000);
    } else {
      const toast = this.toastCtrl.create({
        message: 'Không có nội dung gửi!',
        position: "bottom",
        duration: 1000
      });
      loading.dismiss();      
      toast.present();
    }
    this.messageText = null;
  }

  acceptGift(gift_guid) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();
    this.messagesService.acceptGift(this.userCurrent.username, gift_guid);
    loading.dismiss();
  }

  rejectGift(gift_guid) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();
    this.messagesService.rejectGift(this.userCurrent.username, gift_guid);
    loading.dismiss();    
  }

  newfeedsPage = true;
  membersPage = false;
  groupTab = 'newfeed';

  goToPage(value) {
    switch (value) {
      case 'gift':
        this.appCtrl.getRootNav().push(GiftComponent, { param: this.param });
        break;
      default:
        break;
    }
  }

}
