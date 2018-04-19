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
    // this.barcodeScanner.scan().then((barcodeData) => {
    //   this.walletService.getCartFromQR(barcodeData.text).subscribe(data => {
    //     this.paymentService.items.products = (<any>Object).values(data.products);
    //     this.paymentService.items.sub_total = data.sub_total;
    //     this.paymentService.items.tax = data.tax;
    //     this.paymentService.items.total = data.total;
    //     this.paymentService.items.currency = data.shop.currency;
    //     this.paymentService.items.to_guid = data.to_guid;
    //     this.paymentService.param_create_order.to_guid = data.to_guid;
    //     this.appCtrl.getRootNav().push(PaymentItemsComponent);       
    //   })
    // }, (err) => {    
    //   this.customService.toastMessage("Mã QR không hợp lệ hoặc đã hết hạn", 'bottom', 4000);
    // });
    const qr_test = 'WC8xSnN6RzUwQlU4Z0NzQ2JTeG9oNTAvTGNTVHBNQ0IvVjhCR1BUYzhTaz0'
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });

    loading.present();
    this.paymentService.getTempOrder(qr_test).subscribe(data => {
      //  console.log(data.products);
      //   console.log((<any>Object).values(data.products));
      // const products: Product[] = (<any>Object).values(data.products)
      // const items: Product[] = (<any>Object).values(data.items)

      // for (let index = 0; index < items.length; index++) {
      //   const element = items[index];
      //   console.log(element);
      //   const item = (<any>Object).values(data.items)
      //   for (let i = 0; i < item.length; i++) {
      //     const aaa = item[i];
      //     console.log(aaa);                
      //   }
      // }
      // check update profile        
      if (!this.customService.user_current.address || !this.customService.user_current.province || !this.customService.user_current.district || !this.customService.user_current.ward) {
        this.requestUpdateProfile()
        loading.dismiss();
      }else{
      this.paymentService.payment_qr_data = data;
      this.paymentService.getPaymentMethod().subscribe(data => {
        this.paymentService.payment_order_post = data;
        loading.dismiss();
        this.appCtrl.getRootNav().push(QuickPayListItemComponent)
      });
    }
    })

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
