import { PaymentItemsComponent } from './../payment/payment-items/payment-items.component';
import { PaymentService } from './../../services/payment.service';
import { WalletsService } from './../../services/wallets.service';
import { DepositPaymentMethodComponent } from './../deposit/deposit-payment-method/deposit-payment-method.component';
import { WithdrawnPaymentMethodComponent } from './../withdrawn/withdrawn-payment-method/withdrawn-payment-method.component';
import { CustomService } from './../../services/custom.service';
import { Wallet } from './../../api/models/wallet';
import { InventoriesService } from './../../services/inventories.service';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, App } from 'ionic-angular';
import { Transaction } from '../../api/models';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HistoryOrderDetailComponent } from '../history/history-order-detail/history-order-detail.component';
// import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html'
})
export class WalletComponent implements OnInit {
  public wallet: Wallet; private loading;
  public transactions: Array<Transaction>;
  private PURCHASEORDER = "PurchaseOrder"; private CREATEADVERTISE = "CreateAdvertise";
  private DELETEADVERTISE = "DeleteAdvertise"; private CHANGEADVERTISE = "ChangeAdvertise";
  constructor(
    private appCtrl: App,
    private nav: NavController,
    private inventoryService: InventoriesService,
    private customService: CustomService,
    private walletService: WalletsService,
    private paymentService: PaymentService,
    private barcodeScanner: BarcodeScanner,
    private loadingCtrl: LoadingController) {
  }



  ngOnInit() {
    this.loadData(5)
    this.retryGetTransactions(5);
  }

  retryGetTransactions(retry) {
    if (retry == 0) return;
    this.customService.getTransactions('wallet').subscribe(data => {
      if (data instanceof Array) {
        this.transactions = data;
        this.transactions = this.transactions.filter(e => e.status != "cancel");
      }
    }, err => this.retryGetTransactions(--retry));
  }

  loadData(retry) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();

    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      this.nav.pop();
      return;
    }
    this.inventoryService.getWallet().subscribe(data => {
      this.wallet = data;
      loading.dismiss();
    }, err => this.loadData(--retry));
  }

  formatCurrency(amount: string, currency: string) {
    return this.customService.formatCurrency(amount, currency);
  }

  deposit() {
    this.nav.push(DepositPaymentMethodComponent, { wallet: this.wallet });
  }

  withdrawn() {
    this.nav.push(WithdrawnPaymentMethodComponent, { wallet: this.wallet });
  }

  formatDateTime(time: number) {
    const dateTime = new Date(time);
    return (dateTime.getDate() + 1) + "/" + (dateTime.getMonth() + 1) + "/" + dateTime.getFullYear();
  }

  payment() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.loading = this.loadingCtrl.create();
      this.loading.present();
      this.retryGetQR(5, barcodeData);
    }, (err) => {
      this.customService.toastMessage('Mã QR không hợp lệ', 'bottom', 3000);
    });

  }

  retryGetQR(retry, barcodeData) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
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
    }, err => this.retryGetQR(--retry, barcodeData))
  }

  orderDetail(trans: Transaction) {
    if (trans.order_guid) {
      this.appCtrl.getRootNav().push(HistoryOrderDetailComponent, { guid: trans.order_guid })
    }
  }

  showTransactionDescription(trans: Transaction) {
    switch (trans.description) {
      case "":
        let content;
        if (trans.order_guid) {
          return `<ion-thumbnail item-start>
                  <img class='iconTransaction' src="assets/imgs/ic_wanna_send_blue.png">
                  </ion-thumbnail>
                  <h2>Sử dụng tiền trong ví</h2>
                  <p>Bạn đã sử dụng <strong>`+ this.formatCurrency(trans.quantity + '', trans.currency) + `</strong> vào ngày <strong>` + this.formatDateTime(trans.time_created * 1000) +
            `</strong> để thanh toán hóa đơn <strong>` + trans.order_guid + `</strong> </p>`

        } else if (trans.quantity < 0) {
          if (trans.payment_method == 'sq/bankaccount') {
            content = 'Bạn đã rút về tài khoản <strong>' + trans.bank_account_name + "</strong> : <strong>" + trans.bank_account_number
              + '</strong> số tiền <strong>' + this.formatCurrency(trans.quantity + '', trans.currency) + "</strong>";
          } else if (trans.payment_method == 'paypal/standard') {
            content = 'Bạn đã rút về tài khoản ' + "Paypal: <strong>" + trans.paypal_email +
              '</strong> số tiền <strong>' + this.formatCurrency(trans.quantity + '', trans.currency) + "</strong>";
          }
          return `<ion-thumbnail item-start>
                  <img class='iconTransaction' src="assets/imgs/ic_wanna_send_blue.png">
                  </ion-thumbnail>
                  <h2>Rút tiền khỏi ví</h2>
                  <p>`+ content + `</p>`
        } else {

          return `<ion-thumbnail item-start>
                  <img class='iconTransaction' src="assets/imgs/ic_inventory_new.png">
                  </ion-thumbnail>
                  <h2>Nạp tiền vào ví</h2>
                  <p>Bạn đã nạp <strong>`+ this.formatCurrency(trans.quantity + '', trans.currency) + `</strong> vào ngày <strong>` + this.formatDateTime(trans.time_created * 1000) + `</strong> </p>`
        }
      case this.PURCHASEORDER:
        return `<ion-thumbnail item-start>
                  <img class='iconTransaction' src="assets/imgs/ic_wanna_send_blue.png">
                  </ion-thumbnail>
                  <h2>Thanh toán hóa đơn</h2>
                  <p>Bạn đã thanh toán hóa đơn với <strong>`+ this.formatCurrency(trans.quantity + '', trans.currency) + `</strong> vào ngày <strong>` + this.formatDateTime(trans.time_created * 1000) + `</strong></p>`
      case this.CREATEADVERTISE:
        return `<ion-thumbnail item-start>
                  <img class='iconTransaction' src="assets/imgs/ic_wanna_send_blue.png">
                  </ion-thumbnail>
                  <h2>Tạo mới quảng cáo</h2>
                  <p>Tạo quảng cáo với ngân sách <strong>`+ this.formatCurrency(trans.quantity + '', trans.currency) + `</strong> vào ngày <strong>` + this.formatDateTime(trans.time_created * 1000) + `</strong></p>`

      case this.DELETEADVERTISE:
        return `<ion-thumbnail item-start>
                  <img class='iconTransaction' src="assets/imgs/ic_inventory_new.png">
                  </ion-thumbnail>
                  <h2>Xóa quảng cáo</h2>
                  <p>Quảng cáo đã xóa được cộng dồn vào ví <strong>`+ this.formatCurrency(trans.quantity + '', trans.currency) + `</strong> vào ngày <strong>` + this.formatDateTime(trans.time_created * 1000) + `</strong></p>`

      case this.CHANGEADVERTISE:
        return `<ion-thumbnail item-start>
                  <img class='iconTransaction' src="assets/imgs/ic_voucher_actived.png">
                  </ion-thumbnail>
                  <h2>Chỉnh sửa quảng cáo</h2>
                  <p>Chỉnh sửa quảng cáo <strong>`+ this.formatCurrency(trans.quantity + '', trans.currency) + `</strong>vào ngày <strong>` + this.formatDateTime(trans.time_created * 1000) + `</strong></p>`

      default:
        return "Chưa định nghĩa";

    }
  }

  dismiss() {
    this.nav.pop();
  }
}
