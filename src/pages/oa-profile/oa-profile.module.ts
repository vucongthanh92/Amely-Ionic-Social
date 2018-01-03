import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OaProfilePage } from './oa-profile';

@NgModule({
  declarations: [
    OaProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(OaProfilePage),
  ],
})
export class OaProfilePageModule {}
