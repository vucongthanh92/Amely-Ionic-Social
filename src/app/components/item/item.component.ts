import { CustomService } from './../../services/custom.service';
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
  public is_used: boolean = false;
  is_remove_item: boolean = false;
  constructor(public nav: NavController, public appCtrl: App, private navParams: NavParams, private inventoriesService: InventoriesService, private customService: CustomService) {
    this.itemGuid = this.navParams.get('itemGuid');


  }

  ngOnInit() {
    this.inventoriesService.getItemInventory(this.itemGuid).subscribe(data => {
      this.item = data;
      this.product = data.product_snapshot;
      this.shop = data.product_snapshot.shop;
      this.is_remove_item = this.item.stored_expried || this.item.used;
    })
  }

  createCode() {
    this.is_used = true;
    this.inventoriesService.createRedeem(this.itemGuid, this.item.owner_guid, 1).subscribe(data => {
      if (this.createCode) {
        this.createdCode = data.code
      }
      this.is_used = false;
    })
  }

  gift() {
    this.nav.push(InventoryTargetsGiftComponent, { item: this.item });
  }
  
  removeItem() {
    this.customService.toastMessage('Tính năng đang cập nhật', 'bottom', 2000);
  }
}
