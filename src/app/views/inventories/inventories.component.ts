import { Component, OnInit } from '@angular/core';
import { InventoryPublicComponent } from './inventory-public/inventory-public.component';
import { InventoryPrivateComponent } from './inventory-private/inventory-private.component';
import { InventoryHistoryComponent } from './inventory-history/inventory-history.component';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html'
})

export class InventoriesComponent implements OnInit {

  tabInventoryPrivate = InventoryPrivateComponent;
  tabInventoryPublic = InventoryPublicComponent;
  tabInventoryHistory = InventoryHistoryComponent;

  constructor() { }

  ngOnInit() {
  }

}
