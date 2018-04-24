import { CustomService } from './../../../services/custom.service';
import { PaymentService } from './../../../services/payment.service';
import { Product } from './../../../api/models/product';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
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

  constructor(private nav: NavController, private paymentService: PaymentService, private customService: CustomService
    , private alertCtrl: AlertController) { }

  ngOnInit() {
    this.products = (<any>Object).values(this.paymentService.payment_qr_data.products);
    this.shop = this.paymentService.payment_qr_data.shop;

    this.products.forEach(e => {
      this.total_price += (this.customService.netPrice(e) * e.display_quantity);
    });
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
            if (+data.quantity > total || +data.quantity > product.display_quantity) {
              this.customService.toastMessage('Số lượng sản phẩm sử dụng không hợp lệ', 'bottom', 3000)
            } else {
              this.paymentService.orderRedeem(this.paymentService.payment_qr_data.to_guid, product.guid + "", data.quantity).subscribe(data => {
                if (data && data.products && data.products instanceof Array) {
                  // this.products = JSON.parse(JSON.stringify(data.products));
                  // let productsTMP = [];
                  // data.products.forEach(element => {
                  //   if (element.redeem_quantity && element.redeem_quantity > 0) {
                  //     element.hasInventory = 2;
                  //     productsTMP.push(element);
                  //   }
                  // });
                  // this.products = this.products.concat(productsTMP)
                  // this.products.forEach(e => {
                  //   if (!e.hasInventory || e.hasInventory != 2) {
                  //     this.total_price += this.customService.netPrice(e);
                  //   }
                  // });
                  this.total_price = +data.total
                  this.products = data.products;
                  this.paymentService.payment_qr_data.products = data.products;
                }
              })
            }
          }
        }
      ]
    });
    alert.present();
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
