import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../../../shared/shared.module';
import { NotificationComponent } from './notification.component';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    LaddaModule.forRoot({
      style: "contract"
    })
  ],
  declarations: [
  	NotificationComponent
  ],
  entryComponents: [
    NotificationComponent
  ]
})
export class NotificationModule { }
