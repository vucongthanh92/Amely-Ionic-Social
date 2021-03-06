import { PaymentService } from './../../../services/payment.service';
import { CustomService } from './../../../services/custom.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController, AlertController, LoadingController } from 'ionic-angular';
import { PaymentItemsComponent } from '../../payment/payment-items/payment-items.component';
import { ShoppingsService } from '../../../services/shoppings.service';
import { Product, User } from '../../../api/models';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html'
})
export class CartItemsComponent implements OnInit {

  items: any;
  number_items = 0;
  total = 0;
  public userCurrent: User;

  constructor(
    private paymentService: PaymentService,
    private shoppingsService: ShoppingsService,
    public customService: CustomService,
    public nav: NavController,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public appCtrl: App) { }

  ngOnInit() {
    this.userCurrent = this.customService.user_current;
  }

  ionViewDidEnter() {
    this.items = this.customService.cart;
    console.log(this.items);
    
    this.update();
  }

  increase(guid) {
    let item = this.items.filter(data => data.guid == guid);
    console.log(item[0].quantity);

    if (item.length > 0) {
      if (item[0].quantity_cart < item[0].quantity) {
        item[0].quantity_cart = item[0].quantity_cart + 1;
        this.update();
      } else {
        this.customService.toastMessage('Số lượng sản phẩm đã hết!', 'bottom', 3000);
      }
    }
  }

  decrease(guid) {
    let item = this.items.filter(data => data.guid == guid);
    if (item.length > 0) {
      if (item[0].quantity_cart > 1) {
        item[0].quantity_cart = item[0].quantity_cart - 1;
        this.update();
      }
    }
  }

  remove(guid) {
    let alert = this.alertCtrl.create({
      title: 'Xác nhận',
      message: 'Bạn có muốn xóa sản phẩm khỏi giỏ hàng?',
      buttons: [
        {
          text: 'Từ chối',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Chấp nhận',
          handler: () => {
            this.customService.cart = this.items = this.items.filter(data => data.guid != guid);
            this.update();
          }
        }
      ]
    });
    alert.present();

  }

  update() {
    this.number_items = 0;
    this.total = 0;
    this.items.forEach(e => {
      this.number_items = this.number_items + e.quantity_cart;
      if (e.sale_price == 0 || e.sale_price == null) {
        this.total = this.total + (e.quantity_cart * this.customService.netPrice(e));
      } else {
        this.total = this.total + (e.quantity_cart * this.customService.netSalePrice(e));
      }

    });
  }

  payment() {
    if (this.items.length > 0) {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...',
        enableBackdropDismiss: true
      });

      loading.present();
      let carts = [];
      this.items.forEach(e => {
        let obj = { guid: e.guid, quantity: e.quantity_cart };
        carts.push(obj);
        console.log(obj);

      });
      this.retryPutCart(5, carts, loading);
    } else {
      this.customService.toastMessage('Giỏ hàng đang trống, xin hãy chọn sản phẩm !', 'bottom', 3000);
    }
  }

  retryPutCart(retry, carts, loading) {
    if (retry == 0) {
      loading.dismiss();
      return
    }
    this.shoppingsService.putCart({ items: carts }).subscribe(data => {
      console.log(data);
      
      if (data.status != undefined) {
        this.customService.toastMessage('Số lượng sản phẩm đã hết!', 'bottom', 3000);
      } else {
        this.paymentService.items = data;
        this.appCtrl.getRootNav().push(PaymentItemsComponent);
      }
      loading.dismiss();
    }, err => this.retryPutCart(--retry, carts, loading));
  }

  formartCurrency(item: Product) {
    this.customService.formatCurrency(this.customService.netPrice(item) + "", item.display_currency);
  }
  formartSalePrice(item: Product) {
    this.customService.formatCurrency(this.customService.netSalePrice(item) + "", item.display_currency);
  }

  formatSalePriceShow(price: number, currency: string) {
    return this.customService.formatCurrency(price + "", currency);
  }

  dismiss() {
    this.nav.pop();
  }

  formatTotalPrice() {
    return this.customService.formatCurrency(this.total + "", this.userCurrent.usercurrency)
  }
}
