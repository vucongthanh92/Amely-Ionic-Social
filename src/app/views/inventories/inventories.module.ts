import { LaddaModule } from 'angular2-ladda';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { InventoriesComponent } from './inventories.component';
import { InventoryHistoryComponent } from './inventory-history/inventory-history.component';
import { InventoryPrivateComponent } from './inventory-private/inventory-private.component';
import { InventoryPublicComponent } from './inventory-public/inventory-public.component';
import { SharedModule } from '../../shared/shared.module';
import { InventoryMenuComponent } from './inventory-menu/inventory-menu.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    LaddaModule.forRoot({
      style: "expand-left"
    })
  ],
  declarations: [
  	InventoriesComponent,
  	InventoryHistoryComponent,
  	InventoryPrivateComponent,
  	InventoryPublicComponent,
  	InventoryMenuComponent
  ],
  entryComponents: [
    InventoriesComponent,
  	InventoryHistoryComponent,
  	InventoryPrivateComponent,
    InventoryPublicComponent,
    InventoryMenuComponent
  ]
})
export class InventoriesModule { }
