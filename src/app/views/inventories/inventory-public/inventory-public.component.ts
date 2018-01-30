import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { InventoryComponent } from '../../../components/inventory/inventory.component';

@Component({
  selector: 'app-inventory-public',
  templateUrl: './inventory-public.component.html',
})
export class InventoryPublicComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }

  inventoryPublicTab = 'group';
  groupPage = true;
  eventPage = false;

  goToPage(value) {
    switch (value) {
      case 'group':
        this.groupPage = true;
        this.eventPage = false;
        break;
      case 'event':
        this.groupPage = false;
        this.eventPage = true;
        break;
      case 'gift':
        this.appCtrl.getRootNav().push(InventoryComponent);
        break;
      default:
        break;
    }
  }

}
