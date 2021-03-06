import { GiftsService } from './../../services/gifts.service';
import { CustomService } from './../../services/custom.service';
import { Param_create_gift } from './../../api/models/param-_create-_gift';
import { NavParams, NavController, LoadingController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Item } from '../../api/models/item';

@Component({
  selector: 'app-inventory-confirm-gift',
  templateUrl: './inventory-confirm-gift.component.html'
})

export class InventoryConfirmGiftComponent implements OnInit {

  title: any;
  avatar: any;
  item: Item;
  imageUrl: any;
  quantity: number;
  quantitySend: number = 1;
  param_create_gift: Param_create_gift = {};

  constructor(
    private nav: NavController,
    private giftsService: GiftsService,
    private customService: CustomService,
    private navParams: NavParams,
    private loadingCtrl: LoadingController
  ) {
    let type = this.navParams.get('type');
    let info = this.navParams.get('param');
    this.item = this.navParams.get('item');
    console.log('confirm');
    console.log(this.item);
    this.imageUrl = this.item.product_snapshot.images[0];

    this.param_create_gift.from_guid = this.customService.user_current.guid;
    this.param_create_gift.from_type = 'user';

    switch (type) {
      case 'user':
        this.title = info.fullname;
        this.avatar = info.avatar;
        this.param_create_gift.to_guid = info.guid;
        this.param_create_gift.to_type = 'user';
        break;
      case 'group':
        this.title = info.title;
        this.avatar = info.avatar;
        this.param_create_gift.to_guid = info.guid;
        this.param_create_gift.to_type = 'group';
        break;
      case 'business':
        console.log('business');
        break;
      case 'event':
        console.log('event');
        break;
      default:
        break;
    }
  }

  ngOnInit() {
  }

  onMinus() {
    if (this.quantitySend > 1) {
      this.quantitySend = this.quantitySend - 1;
    }
  }

  onAdd() {
    if (this.quantitySend < (+this.item.quantity)) {
      this.quantitySend = this.quantitySend + 1;
    }
  }

  confirm() {
    this.param_create_gift.item_guid = this.item.guid;
    this.param_create_gift.item_quantity = this.quantitySend;
    this.param_create_gift.message = "";

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();
    this.retryGift(5, loading);
  }

  retryGift(retry, loading) {
    if (retry == 0) return;
    this.giftsService.gift(this.param_create_gift).subscribe(data => {
      loading.dismiss();
      if (data.status) {
        this.customService.toastMessage("Đã tặng quà thành công!!! ", "bottom", 3000);
        this.nav.popToRoot();
      } else {
        this.customService.toastMessage(" Lỗi tặng quà!!! ", "bottom", 3000);
      }
    }, err => this.retryGift(--retry, loading))
  }
}
