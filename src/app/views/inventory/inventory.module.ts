import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { InventoryComponent } from './inventory.component';
import { InventoryHistoryComponent } from './inventory-history/inventory-history.component';
import { InventoryPrivateComponent } from './inventory-private/inventory-private.component';
import { InventoryPublicComponent } from './inventory-public/inventory-public.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule
  ],
  declarations: [
  	InventoryComponent,
  	InventoryHistoryComponent,
  	InventoryPrivateComponent,
  	InventoryPublicComponent
  ],
  entryComponents: [
    InventoryComponent,
  	InventoryHistoryComponent,
  	InventoryPrivateComponent,
  	InventoryPublicComponent
  ]
})
export class InventoryModule { }
