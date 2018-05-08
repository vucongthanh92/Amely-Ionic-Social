import { CustomService } from './../../../services/custom.service';
import { QuickPayListItemComponent } from './../../../modules/quick-pay/quick-pay-list-item/quick-pay-list-item.component';
import { HistoryOrderComponent } from './../../../modules/history/history-order/history-order.component';
import { NavController, App, LoadingController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { PaymentService } from '../../../services/payment.service';
import { UserUpdateComponent } from '../../../components/user/user-update/user-update.component';


@Component({
  selector: 'app-shopping-menu',
  templateUrl: './shopping-menu.component.html'
})
export class ShoppingMenuComponent implements OnInit {

  constructor(private nav: NavController, private appCtrl: App, private barcodeScanner: BarcodeScanner,
    private paymentService: PaymentService, private loadingCtrl: LoadingController, private customService: CustomService) { }

  ngOnInit() {
  }


  historyOrder() {
    this.appCtrl.getRootNav().push(HistoryOrderComponent);
    this.nav.pop();
  }
  payment() {
    this.nav.pop();
    this.barcodeScanner.scan().then((barcodeData) => {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...',
        enableBackdropDismiss: true
      });
      console.log(barcodeData);
      if (!barcodeData.cancelled) {
        loading.present();
        this.paymentService.getTempOrder(barcodeData.text).subscribe(data => {
          // check update profile        
          if (!this.customService.user_current.address || !this.customService.user_current.province || !this.customService.user_current.district || !this.customService.user_current.ward) {
            this.requestUpdateProfile()
            loading.dismiss();
          } else {
            this.paymentService.payment_qr_data = data;
            this.paymentService.getPaymentMethod().subscribe(data => {
              this.paymentService.payment_order_post = data;
              loading.dismiss();
              this.appCtrl.getRootNav().push(QuickPayListItemComponent)
            });
          }
        })
      }
    }, (err) => {
      this.customService.toastMessage("Mã QR không hợp lệ hoặc đã hết hạn", 'bottom', 4000);
    });


  }

  requestUpdateProfile() {
    let myCallbackFunction = (_params) => {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
    this.appCtrl.getRootNav().push(UserUpdateComponent, { callback: myCallbackFunction, showError: true });
  }
}
