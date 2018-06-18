import { Transaction } from './../../../api/models/transaction';
import { CustomService } from './../../../services/custom.service';
import { HistoryDeliveryDetailComponent } from './../history-delivery-detail/history-delivery-detail.component';
import { HistoryService } from './../../../services/history.service';
import { Component, OnInit } from '@angular/core';
import { Delivery_order, Shop } from '../../../api/models';
import { App, NavController, LoadingController } from 'ionic-angular';
import { HistoryDeliveryFromStorageComponent } from '../history-delivery-from-storage/history-delivery-from-storage.component';

@Component({
  selector: 'app-history-delivery',
  templateUrl: './history-delivery.component.html'
})
// export class HistoryDeliveryComponent implements OnInit {
//   dos: Delivery_order[];
//   shops: Shop[];

//   constructor(private historyService: HistoryService, private nav: NavController, private appCtrl: App, private customService: CustomService,
//     public loadingCtrl: LoadingController) { }

//   ngOnInit() {
//     this.loadData(5);
//   }

//   loadData(retry) {

//  let loading = this.loadingCtrl.create({
//   content: 'Please wait...',
//   enableBackdropDismiss: true
// });
// loading.present();

//     if (retry == 0) {
//       loading.dismiss();
//       this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
//       this.nav.pop();
//       return;
//     }
//     this.historyService.deliveryHistory().subscribe(data => {
//       console.log(data);

//       this.dos = data.dos;
//       this.shops = data.shops;
//       loading.dismiss();
//     }, err => this.loadData(--retry))
//   }
//   convertDate(time) {
//     return new Date(time * 1000);
//   }

//   openDetail(deliveryOrder: Delivery_order) {
//     this.appCtrl.getRootNav().push(HistoryDeliveryDetailComponent, { do: deliveryOrder })
//   }

//   openShop(shop: Shop) {
//     // this.appCtrl.getRootNav().push(ShopComponent, { guid: shop.guid })
//   }

//   dismiss() {
//     this.nav.pop();
//   }
// }


export class HistoryDeliveryComponent {
  public transactions: Array<Transaction>;
  shippingFee: number;
  related_guid: number;
  constructor(private historyService: HistoryService, private nav: NavController, private appCtrl: App, private customService: CustomService) { }

  ngOnInit() {
    this.retryGetTransactions(5);
  }

  retryGetTransactions(retry) {
    if (retry == 0) return;
    this.customService.getTransactions('delivery').subscribe(data => {
      if (data instanceof Array) {
        this.transactions = data;
        data.forEach(e => {
          this.shippingFee = e.quantity;
          this.related_guid = e.related_guid;
        });


      }
    }, err => this.retryGetTransactions(--retry));
  }

  convertDate(time) {
    return new Date(time * 1000);
  }

  formatSalePriceShow(shippingFee: number, currency: string) {
    return this.customService.formatCurrency(shippingFee + "", currency);
  }

  openDetail(tran) {
    this.appCtrl.getRootNav().push(HistoryDeliveryFromStorageComponent, { guid: tran.related_guid })
  }

  dismiss() {
    this.nav.pop();
  }
}