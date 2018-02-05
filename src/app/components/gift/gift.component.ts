import { User } from './../../api/models/user';
import { GiftsService } from './../../services/gifts.service';
import { Component, OnInit, Input } from '@angular/core';
import { App, NavController, NavParams, ToastController } from 'ionic-angular';
import { ChooseItemComponent } from './choose-item/choose-item.component';
import { Item } from '../../api/models/item';
import { Gift } from '../../api/models/gift';

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

  constructor(
    public toastCtrl: ToastController,
    public giftsService: GiftsService,
    public params: NavParams,
    public nav: NavController, 
    public appCtrl: App) {
      this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
      this.param = this.params.get('param');
      switch (this.param.chat_type) {
        case 'individual':
          this.isUser = true;
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

  createGift() {
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
      default:
        break;
    }
    this.giftsService.gift(obj).subscribe(res => {
      if (res.status) {
        this.nav.pop();
      } else {
        const toast = this.toastCtrl.create({
          message: 'Lỗi tặng quà !!!',
          position: "bottom",
          duration: 3000
        });

        toast.present();
      }
    });
  }

  goToPage(){
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
