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

  constructor(public nav: NavController, public appCtrl: App, private navParams: NavParams, private inventoryService: InventoriesService) {
    this.ownerGuid = this.navParams.get('ownerGuid');
    this.itemType = this.navParams.get('itemType');
    this.inventoryType = this.navParams.get('inventoryType');
    this.title = this.navParams.get('title');

  }

  ngOnInit() {
    console.log(this.inventoryType);
    
    if (this.itemType==='all') {
      this.inventoryService.getInventory(this.ownerGuid,this.inventoryType).subscribe(data=>{
        if (data instanceof Array) {
          this.inventoriesItem = data;
        }
      })
    }else{
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
        this.appCtrl.getRootNav().push(ItemComponent, { itemGuid: item.guid });
        break;
      case 'default':
        break;
    }
  }

}
