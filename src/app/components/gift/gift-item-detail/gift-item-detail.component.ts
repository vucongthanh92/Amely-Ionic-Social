import { Item } from './../../../api/models/item';
import { Component, OnInit, Input } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'app-gift-item-detail',
  templateUrl: './gift-item-detail.component.html'
})
export class GiftItemDetailComponent implements OnInit {
  public item: Item;
  public quantitySend: number = 1;
  public imageUrl: string;
  constructor(public nav: NavController, public appCtrl: App, private navParams: NavParams) {
    this.item = this.navParams.get('item');
    if (this.item.product_snapshot.images && this.item.product_snapshot.images[0]) {
      this.imageUrl = this.item.product_snapshot.images[0];
    }
  }

  ngOnInit() {
  }

  onMinus() {
    if (this.quantitySend > 1) {
      this.quantitySend = this.quantitySend - 1;
    }
  }

  onAdd() {
    if (this.quantitySend < (+this.item.quantity)) {
      this.quantitySend = this.quantitySend + 1;
    }
  }
}

