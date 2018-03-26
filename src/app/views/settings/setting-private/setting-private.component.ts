import { ShopsService } from './../../../services/shops.service';
import { CreateShopComponent } from './../../../components/create-shop/create-shop.component';
import { CreateWalletComponent } from './../../../modules/wallet/create-wallet/create-wallet.component';
import { InventoriesService } from './../../../services/inventories.service';
import { App, NavController } from 'ionic-angular';
import { CustomService } from './../../../services/custom.service';
import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../../../components/user/user.component';

@Component({
  selector: 'app-setting-private',
  templateUrl: './setting-private.component.html'
})
export class SettingPrivateComponent implements OnInit {

  is_qr: boolean = false;
  code_qr: string;
  constructor(private customService: CustomService, private appCtrl: App,
    private inventoriesService: InventoriesService, private shopService: ShopsService) { }

  ngOnInit() {

  }
  openProfile() {
    this.appCtrl.getRootNav().push(UserComponent, { userGuid: this.customService.user_current.guid });
  }

  openShop() {
    this.inventoriesService.getWallet().subscribe(data => {


      if (data.guid == null) {
        this.appCtrl.getRootNav().push(CreateWalletComponent);
      } else {
        this.getRequestShop();
      }
    })
  }

  // define('SHOP_REQUESTING', 0);
  // define('SHOP_PENDING', 1);
  // define('SHOP_REJECTED', 2);
  // define('SHOP_APPROVED', 3);
  // define('SHOP_SUSPENDED', 4);
  // define('SHOP_UNPUBLISHED', 5);
  getRequestShop() {
    this.shopService.getRequestShop().subscribe(data => {
      if (data.status == '3') {
        this.customService.toastMessage('Đã tạo cửa hàng .', 'bottom', 2000)
      } else if (data.status == '4') {
        this.customService.toastMessage('Cửa hàng đã bị khóa .', 'bottom', 2000)
      } else if (data.status == '5') {
        this.customService.toastMessage('Cửa hàng đã đóng .', 'bottom', 2000)
      } else
        this.appCtrl.getRootNav().push(CreateShopComponent, { shop: data })
    })

  }

  openSQCard() {
    this.customService.toastMessage('Coming Soon', 'bottom', 3000)
  }

  createCode() {
    this.is_qr = true;
    this.code_qr = this.customService.url_site + 'user/' + this.customService.user_current.guid;
  }
}
