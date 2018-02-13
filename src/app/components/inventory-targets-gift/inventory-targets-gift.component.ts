import { NavController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { InventoryTargetGiftComponent } from '../inventory-target-gift/inventory-target-gift.component';

@Component({
  selector: 'app-inventory-targets-gift',
  templateUrl: './inventory-targets-gift.component.html'
})
export class InventoryTargetsGiftComponent implements OnInit {

  constructor(
    private nav: NavController,
    private navParams: NavParams
  ) {
    console.log('targets');
    console.log(this.navParams.get('item'));
   }

  ngOnInit() {
  }

  changePageTarget(type) {
    this.nav.push(InventoryTargetGiftComponent, { param: type, item: this.navParams.get('item') });
  }

  scanQR() {
    console.log('QR');
  }
}
