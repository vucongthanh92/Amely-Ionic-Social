import { DeliveryInfoComponent } from './../delivery-info/delivery-info.component';
import { InventoriesService } from './../../../services/inventories.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, LoadingController } from 'ionic-angular';
import { Item } from '../../../api/models';

@Component({
  selector: 'app-delivery-item',
  templateUrl: './delivery-item.component.html'
})
export class DeliveryItemComponent implements OnInit {

  item: Item;
  quantity: number = 1;
  payment_methods: any;
  constructor(private navParams: NavParams, private nav: NavController, private inventoryService: InventoriesService, public loadingCtrl: LoadingController) {
    this.item = this.navParams.get('item');
  }

  ngOnInit() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();

    this.inventoryService.delevery(null, 'shipping_methods', null, null, null, null, null, null, null, null, null, null, null).subscribe(data => {
      this.payment_methods = (<any>Object).values(data);
      this.payment_methods = this.payment_methods.filter(e => e.filename == 'sq/standard' || e.filename == 'sq/express')
      loading.dismiss();
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
