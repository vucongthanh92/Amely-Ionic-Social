import { WalletComponent } from './../../../modules/wallet/wallet.component';
import { InventoriesService } from './../../../services/inventories.service';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { CreateWalletComponent } from './../../../modules/wallet/create-wallet/create-wallet.component';
import { NavController, App, Popover } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory-menu',
  templateUrl: './inventory-menu.component.html'
})
export class InventoryMenuComponent implements OnInit {
  is_press_wallet: boolean = false;
  constructor(private nav: NavController, private appCtrl: App, private navParams: NavParams, private inventoryService: InventoriesService) {
  }

  ngOnInit() {
  }
  openWallet() {
    this.is_press_wallet = true;
    this.inventoryService.getWallet().subscribe(data => {
      this.is_press_wallet = false;
      if (data.guid!=null) {
        // this.nav.push()
        this.nav.push(WalletComponent)
      }else{
        this.nav.push(CreateWalletComponent)
      }
    })
    
  }
}
