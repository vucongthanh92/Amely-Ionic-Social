import { RenewalItemComponent } from './../renewal-item/renewal-item.component';
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
import { User } from '../../api/models';
import { QrComponent } from '../qr/qr.component';
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
  expiryType: number;
  stored_end: Date;
  isUser: boolean;
  isAdminGroup: boolean;
  ownerGuidGroup: any;
  isAdminEvent: boolean;
  ownerGuidEvent: any;
  user_current: User;
  imageProduct: any = [];

  constructor(public nav: NavController, public appCtrl: App, private navParams: NavParams,
    private inventoriesService: InventoriesService, private customService: CustomService,
    private alertCtrl: AlertController, private userService: UserService, public loadingCtrl: LoadingController) {
    this.itemGuid = this.navParams.get('itemGuid');
    this.callback = this.navParams.get('callback');
    this.isUser = this.navParams.get('inventoryType') == 'user';

    this.user_current = this.customService.user_current;
    this.ownerGuidGroup = this.navParams.get('isAdminGroup');
    this.isAdminGroup = this.user_current.guid == this.ownerGuidGroup;
    this.ownerGuidEvent = this.navParams.get('isAdminEvent');
    this.isAdminEvent = this.user_current.guid == this.ownerGuidEvent;

  }

  ngOnInit() {
    this.loadData(5)
  }

  loadData(retry) {

    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.inventoriesService.getItemInventory(this.itemGuid).subscribe(
      data => {
        this.item = data;
        this.expiryType = +this.item.is_special;
        this.product = data.product_snapshot;
        this.imageProduct = this.product.images;
        this.shop = data.product_snapshot.shop;
        this.is_remove_item = this.item.stored_expried || this.item.used;
        this.formatStoredDate();
      },
      err => {
        this.loadData(--retry)
      })
  }

  createCode() {
    this.customService.confirmPassword(this.alertCtrl, this.userService)
      .then(() => {
        this.is_used = true;
        this.chooseQuantityRedeem();
      })


  }

  chooseQuantityRedeem() {
    let alert = this.alertCtrl.create({
      title: 'Số lượng vật phẩm muốn sử dụng',
      inputs: [
        {
          name: 'quantity',
          placeholder: 'Số lượng',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Từ chối',
          handler: data => {
          }
        },
        {
          text: 'Tiếp tục',
          handler: data => {
            if (isNaN(+data.quantity) || +data.quantity > this.item.quantity || +data.quantity < 0 || +data.quantity % 1 != 0) {
              this.customService.toastMessage('Số lượng sản phẩm sử dụng không hợp lệ', 'bottom', 3000);
              this.is_used = false;
            } else {
              this.retryCreateRedeem(5, +data.quantity);
            }
          }
        }
      ]
    });
    alert.present();
  }

  retryCreateRedeem(retry,quantiry:number) {
    if (retry == 0) {
      this.is_used = false;
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }

    this.inventoriesService.createRedeem(this.itemGuid, this.item.owner_guid, quantiry).subscribe(data => {
      if (this.createCode) {
        this.createdCode = data.code
        this.nav.push(QrComponent, { code: data.code })
      }
      this.is_used = false;
      // loading.dismiss();
    }, err => this.retryCreateRedeem(--retry, quantiry));
  }

  gift() {
    this.customService.confirmPassword(this.alertCtrl, this.userService)
      .then(() => {
        this.nav.push(InventoryTargetsGiftComponent, { item: this.item });
      })
  }

  formatStoredDate() {
    this.stored_end = new Date(+(this.item.stored_end + "000"))
    console.log(this.stored_end);
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
      this.retryAddGiveList(5);
    } else {
      this.item.givelist = "1";
      this.retryDeleteGiveList(5);
    }
  }

  retryAddGiveList(retry) {
    if (retry == 0) {
      return;
    }
    this.inventoriesService.addGiveList(this.itemGuid).subscribe(data => {
      if (!data.status) {
        this.item.givelist = '1';
        this.customService.toastMessage('Thêm vào danh sách muốn cho đi thất bại. Vui lòng thử lại.', 'bottom', 3000);
      } else {
        this.is_reload_before_page = true;
        this.customService.toastMessage('Đã thêm vào danh sách muốn cho đi', 'bottom', 2000);
      }
    }, err => this.retryAddGiveList(--retry))
  }

  retryDeleteGiveList(retry) {
    if (retry == 0) {
      return;
    }
    this.inventoriesService.deleteGiveList(this.itemGuid).subscribe(data => {
      if (!data.status) {
        this.item.givelist = '2';
        this.customService.toastMessage('Hủy danh sách muốn cho đi thất bại. Vui lòng thử lại.', 'bottom', 3000)
      } else {
        this.is_reload_before_page = true;
        this.customService.toastMessage('Đã xóa khỏi danh sách muốn cho đi', 'bottom', 2000);
      }
    }, err => this.retryDeleteGiveList(--retry));
  }
  onWishList(isLike) {
    if (isLike) {
      this.item.wishlist = '2';
      this.retryAddWishList(5);
    } else {
      this.item.wishlist = '1';
      this.retryDeleteWishList(5);
    }
  }

  retryAddWishList(retry) {
    if (retry == 0)
      return;

    this.inventoriesService.addWishList(this.itemGuid).subscribe(data => {
      if (!data.status) {
        this.item.wishlist = '1';
        this.customService.toastMessage('Thêm vào danh sách yêu thích thất bại. Vui lòng thử lại.', 'bottom', 3000);
      } else {
        this.is_reload_before_page = true;
        this.customService.toastMessage('Đã thêm vào danh sách yêu thích', 'bottom', 2000);
      }
    }, err => this.retryAddWishList(--retry))
  }

  retryDeleteWishList(retry) {
    if (retry == 0)
      return;

    this.inventoriesService.deleteWishList(this.itemGuid).subscribe(data => {
      if (!data.status) {
        this.item.wishlist = '2';
        this.customService.toastMessage('Hủy danh sách yêu thích thất bại. Vui lòng thử lại.', 'bottom', 3000);
      } else {
        this.is_reload_before_page = true;
        this.customService.toastMessage('Đã xóa khỏi danh sách yêu thích', 'bottom', 2000);
      }
    }, err => this.retryDeleteWishList(--retry));
  }
  renewalItem() {
    this.customService.confirmPassword(this.alertCtrl, this.userService)
      .then(() => {
        this.appCtrl.getRootNav().push(RenewalItemComponent, { item: this.item, callback: this.callbackRenewal })
      })
  }

  callbackRenewal = (date: number) => {
    return new Promise((resolve, reject) => {
      this.stored_end.setDate((+this.stored_end.getDate()) + (+date));
      this.stored_end = new Date(this.stored_end.getTime());
      resolve();
    });
  }

  dismiss() {
    this.nav.pop();
  }

}
