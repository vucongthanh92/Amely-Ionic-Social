import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NearByComponent } from './near-by.component';
import { NearByUserComponent } from './near-by-user/near-by-user.component';
import { NearByShopComponent } from './near-by-shop/near-by-shop.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NearByComponent, NearByUserComponent, NearByShopComponent]
})
export class NearByModule { }
