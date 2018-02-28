import { logger } from '@firebase/database/dist/esm/src/core/util/util';
import { Item } from './../../api/models/item';
import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { ItemComponent } from '../item/item.component';
import { InventoriesService } from '../../services/inventories.service';

@Component({
  selector: 'app-invenroy-items',
  templateUrl: './invenroy-items.component.html'
})
export class InvenroyItemsComponent implements OnInit {
  private ownerGuid: number;
  private itemType: string;
  private inventoryType: string;
  public inventoriesItem: Array<Item> = [];
  public title: string;
  public is_remove_item = false;
  private is_reload_before_page = false;
  private callback: any;

  constructor(public nav: NavController, public appCtrl: App, private navParams: NavParams, private inventoryService: InventoriesService) {
    this.ownerGuid = this.navParams.get('ownerGuid');
    this.itemType = this.navParams.get('itemType');
    this.inventoryType = this.navParams.get('inventoryType');
    this.title = this.navParams.get('title');
    this.callback = this.navParams.get('callback');
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    if (this.itemType === 'all') {
      this.inventoryService.getInventory(this.ownerGuid, this.inventoryType).subscribe(data => {
        if (data instanceof Array) {
          this.inventoriesItem = data;
        }
      })
    } else {
      this.inventoryService.getInventoriesByType(0, 9999, this.ownerGuid, this.itemType, this.inventoryType).subscribe(data => {
        if (data instanceof Array) {
          this.inventoriesItem = data;
        }
      })
    }
  }

  goToPage(value, item) {
    switch (value) {
      case 'item':
        this.appCtrl.getRootNav().push(ItemComponent, { itemGuid: item.guid, callback: this.myCallbackFunction });
        break;
      case 'default':
        break;
    }
  }
  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    console.log(11111111111111);

  }
  myCallbackFunction = (values) => {
    return new Promise((resolve, reject) => {
      if (values) {
        this.loadData();
        this.is_reload_before_page = true;
        this.callback(values).then((values1) => {
        });
      }
      resolve();
    });
  }
}
