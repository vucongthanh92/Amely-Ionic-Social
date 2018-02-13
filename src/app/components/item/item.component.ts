import { InventoryGiftComponent } from './../inventory-gift/inventory-gift.component';
import { Shop } from './../../api/models/shop';
import { InventoriesService } from './../../services/inventories.service';
import { Item } from './../../api/models/item';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { App } from 'ionic-angular/components/app/app';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Product } from '../../api/models/product';
import { InventoryTargetsGiftComponent } from '../inventory-targets-gift/inventory-targets-gift.component';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {
  qrData = null;
  createdCode = null;
  private itemGuid: number;
  item: Item;
  product: Product;
  shop: Shop;

  constructor(public nav: NavController, public appCtrl: App, private navParams: NavParams, private inventoriesService: InventoriesService) {
    this.itemGuid = this.navParams.get('itemGuid');
    // this.item.product_snapshot
  }

  ngOnInit() {
    this.inventoriesService.getItemInventory(this.itemGuid).subscribe(data => {
      this.item = data;
      this.product = data.product_snapshot;
      this.shop = data.product_snapshot.shop;
    })
  }

  createCode() {
    this.createdCode = "Dsadasdasdasdasdas";
  }

  gift() {
    this.nav.push(InventoryTargetsGiftComponent, { item: this.item });
  }
}
