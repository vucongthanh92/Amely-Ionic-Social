import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { NearByComponent } from './near-by.component';
import { NearByUserComponent } from './near-by-user/near-by-user.component';
import { NearByShopComponent } from './near-by-shop/near-by-shop.component';
import { NearByUserSettingComponent } from './near-by-user/near-by-user-setting/near-by-user-setting.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
  	NearByComponent, 
  	NearByUserComponent, 
  	NearByShopComponent, NearByUserSettingComponent
  ],
  entryComponents: [
    NearByComponent, 
  	NearByUserComponent, 
    NearByShopComponent, NearByUserSettingComponent
  ]
})
export class NearByModule { }
