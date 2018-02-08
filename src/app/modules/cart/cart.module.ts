import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemsComponent } from './cart-items/cart-items.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
  ],
  declarations: [CartItemsComponent],
  entryComponents: [CartItemsComponent],
  exports: [CartItemsComponent]
})
export class CartModule { }
