import { CustomService } from './../../services/custom.service';
import { Shop } from './../../api/models/shop';
import { Component, OnInit } from '@angular/core';
import { ShopsService } from '../../services/shops.service';
import { App, NavController, LoadingController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Store } from '../../api/models';
import { LocationComponent } from '../location/location.component';
import { MessagesService } from '../../services/messages.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {
  public shop: Shop;
  public shopGuid;
  userGuid: number;
  constructor(public nav: NavController, public appCtrl: App, private shopService: ShopsService, private navParams: NavParams, private customService: CustomService,
    public loadingCtrl: LoadingController, private messagesService: MessagesService) {
    this.shopGuid = this.navParams.get('guid');
    let userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
    this.userGuid = userCurrent.guid;

  }

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
    this.shopService.getShop(this.shopGuid, null).subscribe(data => {
      this.shop = data;

    }, err => this.loadData(--retry))
    loading.dismiss();

  }

  shopTab = 'products';
  productsPage = true;
  infoPage = false;

  goToPage(value) {
    switch (value) {
      case 'products':
        this.productsPage = true;
        this.infoPage = false;
        break;
      case 'info':
        this.productsPage = false;
        this.infoPage = true;
        break;
      default:
        break;
    }
  }

  likeShop() {
    if (this.shop.liked) {
      this.retryUnLike(5);
      this.shop.liked = false;
    } else {
      this.retryLike(5);
      this.shop.liked = true;
    }
  }

  retryUnLike(retry) {
    if (retry == 0) return;
    this.customService.unlike('shop', this.shopGuid).subscribe(data => {
      if (!data.status) {
        this.customService.toastMessage('Thích thất bại.Vui lòng thử lại', 'bottom', 3000);
        this.shop.liked = true;
      }
    }, err => this.retryLike(--retry));
  }

  retryLike(retry) {
    if (retry == 0) return;
    this.customService.like('shop', this.shopGuid).subscribe(data => {
      if (!data.status) {
        this.customService.toastMessage('Bỏ thích thất bại.Vui lòng thử lại', 'bottom', 3000);
        this.shop.liked = false;
      }
    }, err => this.retryLike(--retry));
  }

  dismiss() {
    this.nav.pop();
  }

  openStoreLocation(store:Store){
    this.appCtrl.getRootNav().push(LocationComponent, { title: store.title, lat: store.lat, lng: store.lng });
  }

  chatOwner() {
    let friend: any = {};
    friend.from = this.customService.user_current.username;
    friend.to = friend.username;
    this.messagesService.getKeyChat(this.customService.user_current.username, friend.username, "individual").query.once('value', snap => {
      let key = "";
      if (snap.val() == null) {
        this.messagesService.getKeyChat(friend.username, this.customService.user_current.username, "individual").query.once('value', item => {
          if (item.val()) {
            key = item.val().key;
            this.messagesService.createKeyChat("individual", this.customService.user_current.username, friend.username, item.val());
            friend.key = key;
            friend.chat_type = "individual";
            this.appCtrl.getRootNav().push(MessageComponent, { param: friend });
          } else {
            key = this.messagesService.generateKey();
            let obj = { key: key, last_read: 0, unread_count: 0 };
            this.messagesService.createKeyChat("individual", this.customService.user_current.username, friend.username, obj);
            this.messagesService.createKeyChat("individual", friend.username, this.customService.user_current.username, obj);
            friend.key = key;
            friend.chat_type = "individual";
            this.appCtrl.getRootNav().push(MessageComponent, { param: friend });
          }
        });
      } else {
        key = snap.val().key;
        friend.key = key;
        friend.chat_type = "individual";
        this.appCtrl.getRootNav().push(MessageComponent, { param: friend });
      }
    });
  }
}
