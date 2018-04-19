import { CustomService } from './../../../services/custom.service';
import { Product } from './../../../api/models/product';
import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Item } from '../../../api/models';

@Component({
  selector: 'app-quick-pay-redeem',
  templateUrl: './quick-pay-redeem.component.html'
})
export class QuickPayRedeemComponent implements OnInit {
  public quantityRedeem: number = 5;
  public inventoryItem: Item[];
  public product: Product;
  constructor(private viewCtrl: ViewController, private paymentService: PaymentService, private navParams: NavParams, private customService: CustomService) {
    this.product = this.navParams.get('product');

  }

  ngOnInit() {
    this.inventoryItem = this.paymentService.payment_qr_data.items[+this.product.guid];
    this.inventoryItem.forEach(element => {
      element.quantity_temp = 0;
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }



  submit() {

  }

  onMinus(guid) {
    let item: Item = this.inventoryItem.filter(e => e.guid == guid)[0];
    console.log(this.inventoryItem.filter(e => e.guid == guid));
    if (item.quantity_temp > 0) {
      item.quantity_temp--;
    }
  }

  onAdd(guid) {
    let item: Item = this.inventoryItem.filter(e => e.guid == guid)[0];
    if (this.checkTotalRedeem() >= +this.product.display_quantity) {
      this.customService.toastMessage('Đã đủ số lượng', 'bottom', 3000)
    } else if (item.quantity_temp < item.quantity) {
      item.quantity_temp++;
    }
  }

  checkTotalRedeem() {
    let total = 0;
    this.inventoryItem.forEach(e => {
      total += +e.quantity_temp;
    })
    return total;
  }

}
