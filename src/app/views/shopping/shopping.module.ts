import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { ShoppingComponent } from './shopping.component';
import { ShopsComponent } from './shops/shops.component';
import { ShopsFriendlyComponent } from './shops-friendly/shops-friendly.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { SharedModule } from '../../shared/shared.module';
import { ShoppingMenuComponent } from './shopping-menu/shopping-menu.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule
  ],
  declarations: [
    ShoppingComponent,
    ShopsComponent,
    ShopsFriendlyComponent,
    VouchersComponent,
    ShoppingMenuComponent
  ],
  entryComponents: [
    ShoppingComponent,
    ShopsComponent,
    ShopsFriendlyComponent,
    VouchersComponent,
    ShoppingMenuComponent
  ]
})
export class ShoppingModule { }
