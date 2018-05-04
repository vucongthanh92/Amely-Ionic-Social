import { CustomService } from './../../../services/custom.service';
import { Order } from './../../../api/models/order';
import { HistoryService } from './../../../services/history.service';
import { Transaction } from './../../../api/models/transaction';
import { NavParams, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { User, Product } from '../../../api/models';

@Component({
  selector: 'app-history-order-detail',
  templateUrl: './history-order-detail.component.html'
})
export class HistoryOrderDetailComponent implements OnInit {
  order: Order;
  order_guid: number;
  tran: Transaction;
  totalItem: number = 0;
  totalAmount: number = 0;
  user_current: User;

  constructor(private navParams: NavParams, private historyService: HistoryService, private customService: CustomService, private nav: NavController) {
    this.tran = this.navParams.get('transaction');
    this.order_guid = this.navParams.get('guid');
    this.user_current = this.customService.user_current;
  }

  ngOnInit() {
    this.loadData(5);
  }

  loadData(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      this.nav.pop();
      return;
    }
    this.historyService.getOrder(this.order_guid ? this.order_guid : this.tran.related_guid).subscribe(data => {
      this.order = data;
      this.order.order_item
      if (this.order.order_item) {
        this.order.order_item.forEach(e => {
          this.totalItem = this.totalItem + e.qty;
          if (e.sale_price == 0 || e.sale_price == null) {
            this.totalAmount = this.totalAmount + ((+e.price + (+e.price * (+e.tax / 100))) * e.qty);
          } else {
            this.totalAmount = this.totalAmount + ((+e.sale_price + (+e.sale_price * (+e.tax / 100))) * e.qty);
          }
        })
      } else {
        this.totalItem = 0;
        this.totalAmount = 0;
      }
    }, err => this.loadData(--retry))
  }

  formatCurrency(item: Product) {
    return this.customService.formatCurrency(this.customService.netPrice(item) + "", item.currency);
  }
  formatTotalPrive(amount: number, usercurrency) {
    return this.customService.formatCurrency(amount + "", usercurrency);
  }

  formatSalePrice(price: number, currency: string) {
    return this.customService.formatCurrency(price + "", currency);
  }
}
