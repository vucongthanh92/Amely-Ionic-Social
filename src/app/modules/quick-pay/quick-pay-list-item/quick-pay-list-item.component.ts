import { CustomService } from './../../../services/custom.service';
import { PaymentService } from './../../../services/payment.service';
import { Product } from './../../../api/models/product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController, Navbar } from 'ionic-angular';
import { QuickPayMethodComponent } from '../quick-pay-method/quick-pay-method.component';
import { Shop } from '../../../api/models';

@Component({
  selector: 'app-quick-pay-list-item',
  templateUrl: './quick-pay-list-item.component.html'
})
export class QuickPayListItemComponent implements OnInit {

  products: Product[];
  shop: Shop;
  total_price: number = 0;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(private nav: NavController, private paymentService: PaymentService, private customService: CustomService
    , private alertCtrl: AlertController) { }

  ngOnInit() {
    this.products = (<any>Object).values(this.paymentService.payment_qr_data.products);
    this.shop = this.paymentService.payment_qr_data.shop;

    this.products.forEach(e => {
      this.total_price += (this.customService.netPrice(e) * e.display_quantity);
    });
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      // todo something
      this.nav.pop();
      console.log(12321321321);
      this.paymentService.deleteQuickPay(this.paymentService.payment_qr_data.to_guid).subscribe(data=>{})
    }
  }

  showInventoryItem(product: Product) {
    // let profileModal = this.modalCtrl.create(QuickPayRedeemComponent, { product: product });
    // profileModal.present();
    const inventoryItem = this.paymentService.payment_qr_data.items[+product.guid];
    let total = 0;
    inventoryItem.forEach(e => {
      total = +total + +e.quantity;
    })

    let alert = this.alertCtrl.create({
      title: 'Xử dụng sản phẩm trong kho',
      inputs: [
        {
          name: 'quantity',
          placeholder: 'Tối đa ' + total + ' sản phẩm',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Từ chối',
          role: 'cancel',
          handler: data => {
            console.log(this.paymentService.payment_qr_data.to_guid + " " + product.guid + " " + data.quantity);
          }
        },
        {
          text: 'Chấp nhận',
          handler: data => {
            if (+data.quantity > total || +data.quantity > product.display_quantity || +data.quantity < 0 || +data.quantity % 1 != 0 || isNaN(+data.quantity)) {
              this.customService.toastMessage('Số lượng sản phẩm sử dụng không hợp lệ', 'bottom', 3000)
            } else {
              this.retryOrderRedeem(5, product, data);
            }
          }
        }
      ]
    });
    alert.present();
  }

  retryOrderRedeem(retry, product, data) {
    if (retry == 0) {
      return;
    }
    this.paymentService.orderRedeem(this.paymentService.payment_qr_data.to_guid, product.guid + "", data.quantity).subscribe(data => {
      if (data && data.products && data.products instanceof Array) {
        this.total_price = +data.total
        this.products = data.products;
        this.paymentService.payment_qr_data.products = data.products;
      }
    }, err => this.retryOrderRedeem(--retry, product, data))
  }

  next() {
    this.nav.push(QuickPayMethodComponent);
    this.paymentService.quick_pay_send_data.products = this.products;
    this.paymentService.quick_pay_send_data.shop = this.shop;
  }

  formatCurrency(product: Product, currency: string) {
    return this.customService.formatCurrency(this.customService.netPrice(product) + "", currency);
  }

  formatTotalPrice() {
    return this.customService.formatCurrency(this.total_price + "", this.customService.user_current.usercurrency);
  }

  callback = () => {
    return new Promise((resolve, reject) => {

      resolve();
    });
  }
}
