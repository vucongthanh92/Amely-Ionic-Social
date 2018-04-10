import { UserService } from './../../services/user.service';
import { DeliveryItemComponent } from './../../modules/delivery/delivery-item/delivery-item.component';
import { CustomService } from './../../services/custom.service';
import { Shop } from './../../api/models/shop';
import { InventoriesService } from './../../services/inventories.service';
import { Item } from './../../api/models/item';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { App } from 'ionic-angular/components/app/app';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Product } from '../../api/models/product';
import { InventoryTargetsGiftComponent } from '../inventory-targets-gift/inventory-targets-gift.component';
import { AlertController, LoadingController } from 'ionic-angular';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {
  qrData = null;
  createdCode = null;
  private itemGuid: number;
  item: Item;
  product: Product;
  shop: Shop;
  public is_used: boolean = false;
  is_remove_item: boolean = false;
  callback: any;
  is_reload_before_page = false;

  constructor(public nav: NavController, public appCtrl: App, private navParams: NavParams,
    private inventoriesService: InventoriesService, private customService: CustomService,
    private alertCtrl: AlertController, private userService: UserService, public loadingCtrl: LoadingController) {
    this.itemGuid = this.navParams.get('itemGuid');
    this.callback = this.navParams.get('callback');
  }

  ngOnInit() {
    this.loadData(5)
  }

  loadData(retry) {

    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   enableBackdropDismiss: true
    // });
    // loading.present();

    if (retry == 0) {
      // loading.dismiss();
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.inventoriesService.getItemInventory(this.itemGuid).subscribe(
      data => {
        this.item = data;
        this.product = data.product_snapshot;
        this.shop = data.product_snapshot.shop;
        this.is_remove_item = this.item.stored_expried || this.item.used;
        // loading.dismiss();
      },
      err => {
        this.loadData(--retry)
      })
  }
  createCode() {

    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   enableBackdropDismiss: true
    // });
    // loading.present();

    this.customService.confirmPassword(this.alertCtrl, this.userService)
      .then(() => {
        this.is_used = true;
        this.inventoriesService.createRedeem(this.itemGuid, this.item.owner_guid, 1).subscribe(data => {
          if (this.createCode) {
            this.createdCode = data.code
          }
          this.is_used = false;
          // loading.dismiss();
        })
      })


  }

  gift() {
    this.customService.confirmPassword(this.alertCtrl, this.userService)
      .then(() => {
        this.nav.push(InventoryTargetsGiftComponent, { item: this.item });
      })
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.callback(this.is_reload_before_page).then((values) => {

    });

  }
  removeItem() {
    this.customService.toastMessage('Tính năng đang cập nhật', 'bottom', 2000);
  }

  delivery() {
    this.customService.confirmPassword(this.alertCtrl, this.userService)
      .then(() => {
        this.nav.push(DeliveryItemComponent, { item: this.item });
      })
  }

  onGiveList(isLike) {
    if (isLike) {
      this.item.givelist = '2';
      this.inventoriesService.addGiveList(this.itemGuid).subscribe(data => {
        if (!data.status) {
          this.item.givelist = '1';
          this.customService.toastMessage('Thêm vào danh sách muốn cho đi thất bại. Vui lòng thử lại.', 'bottom', 3000);
        } else {
          this.is_reload_before_page = true;
        }
      })
    } else {
      this.item.givelist = "1";
      this.inventoriesService.deleteGiveList(this.itemGuid).subscribe(data => {
        if (!data.status) {
          this.item.givelist = '2';
          this.customService.toastMessage('Hủy danh sách muốn cho đi thất bại. Vui lòng thử lại.', 'bottom', 3000)
        } else {
          this.is_reload_before_page = true;
        }
      })
    }
  }

  onWishList(isLike) {
    if (isLike) {
      this.item.wishlist = '2';
      this.inventoriesService.addWishList(this.itemGuid).subscribe(data => {
        if (!data.status) {
          this.item.wishlist = '1';
          this.customService.toastMessage('Thêm vào danh sách yêu thích thất bại. Vui lòng thử lại.', 'bottom', 3000);
        } else {
          this.is_reload_before_page = true;
        }
      })
    } else {
      this.item.wishlist = '1';
      this.inventoriesService.deleteWishList(this.itemGuid).subscribe(data => {
        if (!data.status) {
          this.item.wishlist = '2';
          this.customService.toastMessage('Hủy danh sách yêu thích thất bại. Vui lòng thử lại.', 'bottom', 3000);
        } else {
          this.is_reload_before_page = true;
        }
      })
    }
  }


}
