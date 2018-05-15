import { HistoryDeliveryComponent } from './../../../modules/history/history-delivery/history-delivery.component';
import { WalletComponent } from './../../../modules/wallet/wallet.component';
import { InventoriesService } from './../../../services/inventories.service';
import { CreateWalletComponent } from './../../../modules/wallet/create-wallet/create-wallet.component';
import { NavController, App, LoadingController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory-menu',
  templateUrl: './inventory-menu.component.html'
})
export class InventoryMenuComponent implements OnInit {
  is_press_wallet: boolean = false;
  constructor(private nav: NavController, private appCtrl: App, private inventoryService: InventoriesService,
    public loadingCtrl: LoadingController) {
  }

  ngOnInit() {
  }
  openWallet() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();

    this.is_press_wallet = true;
    this.retryGetWallet(5, loading);
    this.nav.pop();
  }

  retryGetWallet(retry, loading) {
    if (retry == 0) return;
    this.inventoryService.getWallet().subscribe(data => {
      this.is_press_wallet = false;
      if (data.guid != null) {
        loading.dismiss();
        // this.nav.push()
        this.appCtrl.getRootNav().push(WalletComponent)
      } else {
        loading.dismiss();
        this.appCtrl.getRootNav().push(CreateWalletComponent)
      }
    }, err => this.retryGetWallet(--retry, loading));
  }

  historyDelivery() {
    this.appCtrl.getRootNav().push(HistoryDeliveryComponent)
    this.nav.pop();
  }
}
