import { CustomService } from './../../services/custom.service';
import { MessagesService } from './../../services/messages.service';
import { User } from './../../api/models/user';
import { GiftsService } from './../../services/gifts.service';
import { Component, OnInit, Input } from '@angular/core';
import { App, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { ChooseItemComponent } from './choose-item/choose-item.component';
import { Item } from '../../api/models/item';
import { Gift } from '../../api/models/gift';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html'
})
export class GiftComponent implements OnInit {

  @Input('description') description: string;

  item: Item;
  avatar: string;
  userCurrent: User;
  param: any;
  gift: Gift;
  receiver: string;
  isUser: boolean;
  usernameGift: string;

  constructor(
    public messagesService: MessagesService,
    public toastCtrl: ToastController,
    public giftsService: GiftsService,
    public params: NavParams,
    public nav: NavController,
    private alertCtrl: AlertController,
    private customService: CustomService,
    private userService: UserService,
    public loadingCtrl: LoadingController,
    public appCtrl: App) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
    this.param = this.params.get('param');
    console.log(this.param);
    
    switch (this.param.chat_type) {
      case 'individual':
        this.checkKeyChat(this.userCurrent.username, this.param.from, "individual");
        this.isUser = true;
        if (this.param.from == this.userCurrent.username) {
          this.usernameGift = this.param.fullname;
        } else {
          this.usernameGift = this.param.from;
        }
        break;

      default:
        this.isUser = false;
        break;
    }
  }

  ngOnInit() {
  }

  ionViewDidEnter() {

  }

  checkKeyChat(owner_from, owner_to, type) {
    this.messagesService.getKeyChat(owner_from, owner_to, "individual").query.once('value', snap => {
      let key = "";
      if (snap.val() == null) {
        this.messagesService.getKeyChat(owner_to, owner_from, "individual").query.once('value', item => {
          if (item.val()) {
            key = item.val().key;
            this.messagesService.createKeyChat("individual", owner_from, owner_to, item.val());
          } else {
            key = this.messagesService.generateKey();
            let obj = { key: key, last_read: 0, unread_count: 0 };
            this.messagesService.createKeyChat("individual", owner_from, owner_to, obj);
            this.messagesService.createKeyChat("individual", owner_to, owner_from, obj);
          }
        });
      } else {
        return true;
      }
    });
  }

  createGift() {


    if (!this.item) {
      this.customService.toastMessage('Chưa chọn quà', 'bottom', 2000);
    } else {
      this.customService.confirmPassword(this.alertCtrl, this.userService)
        .then(() => {

          let obj = {
            from_guid: this.userCurrent.guid,
            to_guid: this.param.guid,
            to_type: "user",
            item_guid: this.item.guid,
            item_quantity: this.item.quantity,
            message: this.description
          };
          switch (this.param.chat_type) {
            case 'individual':
              obj.to_type = "user";
              break;
            case 'group':
              obj.to_type = "group";
              break;
            case 'event':
              obj.to_type = "event";
              break;
            case 'business':
              obj.to_type = "business";
              break;
            default:
              this.customService.toastMessage('Lỗi tặng quà !!!', 'bottom', 3000);
              return;

          }

          

          let loading = this.loadingCtrl.create({
            content: 'Please wait...',
            enableBackdropDismiss: true
          });
          loading.present();
          this.giftsService.gift(obj).subscribe(res => {
            loading.dismiss();
            if (res.status) {
              this.nav.pop();
            } else {
              const toast = this.toastCtrl.create({
                message: 'Hạn mức số lần tặng quà đã hết !!!',
                position: "bottom",
                duration: 3000
              });
             
              toast.present();
            }
          });
        })

    }
  }

  goToPage() {
    this.appCtrl.getRootNav().push(ChooseItemComponent, {
      callback: this.myCallbackFunction
    });
  }

  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      this.item = _params;
      this.avatar = this.item.product_snapshot.images[0];
      resolve();
    });
  }
}
