import { logger } from '@firebase/database/dist/esm/src/core/util/util';
import { CustomService } from './../../services/custom.service';
import { Wallet } from './../../api/models/wallet';
import { InventoriesService } from './../../services/inventories.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WalletDepositComponent } from './wallet-deposit/wallet-deposit.component';
import { WalletWithdrawnComponent } from './wallet-withdrawn/wallet-withdrawn.component';
import { Transaction } from '../../api/models';
// import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html'
})
export class WalletComponent implements OnInit {
  public wallet: Wallet;
  public transactions: Array<Transaction>;
  a = `<h1>12321</h1>
      <p> 123213 </p>`;
  private PURCHASEORDER = "PurchaseOrder"; private CREATEADVERTISE = "CreateAdvertise";
  private DELETEADVERTISE = "DeleteAdvertise"; private CHANGEADVERTISE = "ChangeAdvertise";
  constructor(
    private nav: NavController,
    private inventoryService: InventoriesService,
    private customService: CustomService
  ) { }

  ngOnInit() {
    this.inventoryService.getWallet().subscribe(data => {
      this.wallet = data;
    });
    this.customService.getTransactions('wallet').subscribe(data => {
      this.transactions = data;
    });
  }

  formatCurrency(amount: string, currency: string) {
    return this.customService.formatCurrency(amount, currency);
  }

  deposit() {
    this.nav.push(WalletDepositComponent);
  }

  withdrawn() {
    this.nav.push(WalletWithdrawnComponent);
  }

  formatDateTime(time: number) {
    const dateTime = new Date(time);
    return (dateTime.getDate() + 1) + "/" + (dateTime.getMonth()+1) + "/" + dateTime.getFullYear();
  }
  showTransactionDescription(trans: Transaction) {
    let desc: string;
    switch (trans.description) {
      case "":
        let content;
        if (trans.quantity < 0) {
          if (trans.payment_method == 'sq/bankaccount') {
            content = 'Bạn đã rút về tài khoản ' + trans.bank_account_name + " : " + trans.bank_account_number
              + ' số tiền ' + this.formatCurrency(trans.quantity + '', trans.currency);
          } else if (trans.payment_method == 'paypal/standard') {
            content = 'Bạn đã rút về tài khoản ' + "Paypal: " + trans.paypal_email +
              ' số tiền ' + this.formatCurrency(trans.quantity + '', trans.currency);
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
                  <p>Bạn đã nạp `+ this.formatCurrency(trans.quantity + '', trans.currency) + `vào ngày ` + this.formatDateTime(trans.time_created * 1000) + `</p>`
        }
      case this.PURCHASEORDER:
        return `<ion-thumbnail item-start>
                  <img class='iconTransaction' src="assets/imgs/ic_wanna_send_blue.png">
                  </ion-thumbnail>
                  <h2>Thanh toán hóa đơn</h2>
                  <p>Bạn đã thanh toán hóa đơn với `+ this.formatCurrency(trans.quantity + '', trans.currency) + `vào ngày ` + this.formatDateTime(trans.time_created * 1000) + `</p>`
      case this.CREATEADVERTISE:
        return `<ion-thumbnail item-start>
                  <img class='iconTransaction' src="assets/imgs/ic_wanna_send_blue.png">
                  </ion-thumbnail>
                  <h2>Tạo mới quảng cáo</h2>
                  <p>Tạo quảng cáo với ngân sách `+ this.formatCurrency(trans.quantity + '', trans.currency) + `vào ngày ` + this.formatDateTime(trans.time_created * 1000) + `</p>`

      case this.DELETEADVERTISE:
        return `<ion-thumbnail item-start>
                  <img class='iconTransaction' src="assets/imgs/ic_inventory_new.png">
                  </ion-thumbnail>
                  <h2>Xóa quảng cáo</h2>
                  <p>Quảng cáo đã xóa được cộng dồn vào ví `+ this.formatCurrency(trans.quantity + '', trans.currency) + `vào ngày ` + this.formatDateTime(trans.time_created * 1000) + `</p>`

      case this.CHANGEADVERTISE:
        return `<ion-thumbnail item-start>
                  <img class='iconTransaction' src="assets/imgs/ic_voucher_actived.png">
                  </ion-thumbnail>
                  <h2>Chỉnh sửa quảng cáo</h2>
                  <p>Chỉnh sửa quảng cáo `+ this.formatCurrency(trans.quantity + '', trans.currency) + `vào ngày ` + this.formatDateTime(trans.time_created * 1000) + `</p>`

      default:
        return "Chưa định nghĩa";

    }
  }
}
