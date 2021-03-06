import { User } from './../../../api/models/user';
import { Item } from './../../../api/models/item';
import { InventoriesService } from './../../../services/inventories.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController, ModalController, NavParams, LoadingController } from 'ionic-angular';
import { GiftItemDetailComponent } from '../gift-item-detail/gift-item-detail.component';

@Component({
  selector: 'app-choose-item',
  templateUrl: './choose-item.component.html'
})
export class ChooseItemComponent implements OnInit {

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
    public loadingCtrl: LoadingController) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
  }

  ngOnInit() {
    this.arrTagBadge = [
      { item_type: 'wishlist', title: 'Yêu thích', image: 'assets/imgs/ic_inventory_like.png' },
      { item_type: 'non_expiry', title: 'Không hạn dùng', image: 'assets/imgs/ic_inventory_no_expired.png' },
      { item_type: 'expiry', title: 'Có hạn dùng', image: 'assets/imgs/ic_inventory_expired.png' },
      { item_type: 'voucher', title: 'E-Voucher', image: 'assets/imgs/ic_inventory_voucher.png' },
      { item_type: 'ticket', title: 'E-Ticket', image: 'assets/imgs/ic_inventory_ticket.png' },
      { item_type: 'new', title: 'Mới nhập', image: 'assets/imgs/ic_inventory_new.png' },
      { item_type: 'givelist', title: 'Muốn cho đi', image: 'assets/imgs/ic_inventory_wanna_send.png' }
    ];

    this.arrTagBadge.forEach(e => {
      this.retryGetInventoriesByType(5, e);
    })
  }

  retryGetInventoriesByType(retry, e) {
    if (retry == 0) return;
    this.inventorySerive.getInventoriesByType(0, 9999, this.userCurrent.guid, e.item_type, 'user').subscribe(
      data => {
        if (data) {
          this.types.push({ item_type: e.item_type, title: e.title, image: e.image, badge: data.length ? data.length : 0 })
          if (data instanceof Array) {
            if (e.item_type != 'wishlist' && e.item_type != 'givelist' && e.item_type != 'new') {
              this.inventoriesItem = this.inventoriesItem.concat(data);
            }
          }
        }
      },
      err => this.retryGetInventoriesByType(--retry, e));
  }
  presentItemDetail(item) {
    let profileModal = this.modalCtrl.create(GiftItemDetailComponent, { item: item });
    profileModal.present();

    profileModal.onDidDismiss(item => {
      let callback = this.params.get("callback");

      callback(item.item).then(() => {
        this.nav.pop();
      });
    });
  }

  onFilterItem(item_type) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();
    this.retryOnFilterItem(5, item_type, loading);
  }

  retryOnFilterItem(retry, item_type, loading) {
    if (retry == 0) return;
    this.inventorySerive.getInventoriesByType(0, 9999, this.userCurrent.guid, item_type, 'user').subscribe(
      data => {
        if (data instanceof Array) {
          loading.dismiss();
          this.inventoriesItem = data;
        } else {
          loading.dismiss();
          this.inventoriesItem = [];
        }
      },
      err => { this.retryOnFilterItem(--retry, item_type, loading) })
  }

  goToDetail(item) {
    this.appCtrl.getRootNav().push(GiftItemDetailComponent, { item: item });
  }

  dismiss() {
    this.nav.pop();
  }

}
