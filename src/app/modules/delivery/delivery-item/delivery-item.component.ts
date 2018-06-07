import { DeliveryInfoComponent } from './../delivery-info/delivery-info.component';
import { InventoriesService } from './../../../services/inventories.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, LoadingController } from 'ionic-angular';
import { Item } from '../../../api/models';
import { CustomService } from '../../../services/custom.service';

@Component({
  selector: 'app-delivery-item',
  templateUrl: './delivery-item.component.html'
})
export class DeliveryItemComponent implements OnInit {

  item: Item;
  quantity: number = 1;
  payment_methods: any;
  constructor(private navParams: NavParams, private nav: NavController, private inventoryService: InventoriesService, public loadingCtrl: LoadingController, private customService: CustomService) {
    this.item = this.navParams.get('item');
  }

  ngOnInit() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();
    this.retryDelevery(5, loading);
  }

  retryDelevery(retry, loading) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.inventoryService.delevery(null, 'shipping_methods', null, null, null, null, null, null, null, null, null, null, null).subscribe(data => {
      this.payment_methods = (<any>Object).values(data);
      this.payment_methods = this.payment_methods.filter(e => e.filename == 'sq/standard' || e.filename == 'sq/express')
      loading.dismiss();
    }, err => {
      console.log(err);
      this.retryDelevery(--retry, loading);
    })
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity = this.quantity - 1;
    }
  }

  increase() {

    if (this.quantity < +this.item.quantity) {
      this.quantity = this.quantity + 1;
    }
  }
  changePage() {
    this.nav.push(DeliveryInfoComponent, { item: this.item, quantity: this.quantity, payment_methods: this.payment_methods });
  }
}
