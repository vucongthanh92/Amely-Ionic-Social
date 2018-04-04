import { CustomService } from './../../../services/custom.service';
import { HistoryOrderComponent } from './../../../modules/history/history-order/history-order.component';
import { NavController, App, LoadingController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { WalletsService } from '../../../services/wallets.service';
import { PaymentService } from '../../../services/payment.service';
import { PaymentItemsComponent } from '../../../modules/payment/payment-items/payment-items.component';

@Component({
  selector: 'app-shopping-menu',
  templateUrl: './shopping-menu.component.html'
})
export class ShoppingMenuComponent implements OnInit {
  private loading;
  constructor(private nav: NavController, private appCtrl: App, private barcodeScanner: BarcodeScanner, private loadingCtrl: LoadingController
    , private walletService: WalletsService, private paymentService: PaymentService, private customService: CustomService) { }

  ngOnInit() {
  }


  historyOrder() {
    this.appCtrl.getRootNav().push(HistoryOrderComponent);
    this.nav.pop();
  }
  payment() {
    this.nav.pop();
    this.barcodeScanner.scan().then((barcodeData) => {
      this.loading = this.loadingCtrl.create();
      this.loading.present();
      this.walletService.getCartFromQR(barcodeData.text).subscribe(data => {
        this.paymentService.items.products = (<any>Object).values(data.products);
        this.paymentService.items.sub_total = data.sub_total;
        this.paymentService.items.tax = data.tax;
        this.paymentService.items.total = data.total;
        this.paymentService.items.currency = data.shop.currency;
        this.paymentService.items.to_guid = data.to_guid;
        this.paymentService.param_create_order.to_guid = data.to_guid;
        this.loading.dismiss();
        this.appCtrl.getRootNav().push(PaymentItemsComponent);
      })
    }, (err) => {
      this.customService.toastMessage(err, 'bottom', 3000);
    });

  }

}
