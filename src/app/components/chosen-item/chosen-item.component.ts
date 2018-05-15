import { CustomService } from './../../services/custom.service';
import { User } from './../../api/models/user';
import { InventoriesService } from './../../services/inventories.service';
import { App, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Item } from '../../api/models/item';
import { GiftItemDetailComponent } from '../gift/gift-item-detail/gift-item-detail.component';

@Component({
  selector: 'app-chosen-item',
  templateUrl: './chosen-item.component.html'
})

export class ChosenItemComponent implements OnInit {

  types: Array<{ item_type: string, title: string, image: string, badge: number }> = [];
  public inventoriesItem: Array<Item> = [];
  private arrTagBadge: any;
  private userCurrent: User;
  constructor(
    public params: NavParams,
    public modalCtrl: ModalController,
    public nav: NavController,
    public appCtrl: App,
    public inventorySerive: InventoriesService,
    public customService: CustomService,
    public loadingCtrl: LoadingController) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();

    this.arrTagBadge = [
      // { item_type: 'wishlist', title: 'Yêu thích', image: 'assets/imgs/ic_inventory_like.png' },
      { item_type: 'non_expiry', title: 'Không hạn dùng', image: 'assets/imgs/ic_inventory_no_expired.png' },
      { item_type: 'expiry', title: 'Có hạn dùng', image: 'assets/imgs/ic_inventory_expired.png' },
      { item_type: 'voucher', title: 'E-Voucher', image: 'assets/imgs/ic_inventory_voucher.png' },
      { item_type: 'ticket', title: 'E-Ticket', image: 'assets/imgs/ic_inventory_ticket.png' },
      // { item_type: 'new', title: 'Mới nhập', image: 'assets/imgs/ic_inventory_new.png' },
      // { item_type: 'givelist', title: 'Muốn cho đi', image: 'assets/imgs/ic_inventory_wanna_send.png' }
    ]; 

    this.arrTagBadge.forEach(e => {

      this.retryGetInventoryByType(5, e);
    })
    loading.dismiss();
  }

  retryGetInventoryByType(retry, e) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.inventorySerive.getInventoriesByType(0, 9999, this.userCurrent.guid, e.item_type, 'user').subscribe(data => {
      if (data) {
        this.types.push({ item_type: e.item_type, title: e.title, image: e.image, badge: data.length ? data.length : 0 })
        if (data instanceof Array) {
          this.inventoriesItem = this.inventoriesItem.concat(data);
        }
      }
    }
      , err => {
        this.retryGetInventoryByType(--retry, e);
      });
  }
  presentItemDetail(item) {
    let profileModal = this.modalCtrl.create(GiftItemDetailComponent, { item: item });
    profileModal.present();

    profileModal.onDidDismiss(item => {
      if (typeof (item) != "undefined") {
        let callback = this.params.get("callback");

        callback(item.item).then(() => {
          this.nav.pop();
        });
      }
    });
  }

  onFilterItem(item_type) {
    this.retryFilterItem(5, item_type);
  }

  retryFilterItem(retry, item_type) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.inventorySerive.getInventoriesByType(0, 9999, this.userCurrent.guid, item_type, 'user').subscribe(data => {
      if (data instanceof Array) {
        this.inventoriesItem = data;
      } else {
        this.inventoriesItem = [];
      }
    }, err => this.retryFilterItem(--retry, item_type));
  }
  
  goToDetail(item) {
    this.appCtrl.getRootNav().push(GiftItemDetailComponent, { item: item });
  }
}

