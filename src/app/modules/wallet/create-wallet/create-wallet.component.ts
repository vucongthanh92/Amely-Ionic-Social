import { WalletComponent } from './../wallet.component';
import { CustomService } from './../../../services/custom.service';
import { InventoriesService } from './../../../services/inventories.service';
import { NavController, LoadingController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html'
})
export class CreateWalletComponent implements OnInit {

  constructor(private nav: NavController, private inventoryService: InventoriesService, private customService: CustomService, public loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  onAccept() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();

    this.inventoryService.createWallet().subscribe(data => {
      if (data.status) {
        loading.dismiss();
        this.nav.push(WalletComponent)
      } else {
        loading.dismiss();
        this.customService.toastMessage('Tạo ví thất bại. Vui lòng thử lại !', 'bottom', 2000)
      }
    })
  }
  onCancel() {
    this.nav.pop();
  }
}
