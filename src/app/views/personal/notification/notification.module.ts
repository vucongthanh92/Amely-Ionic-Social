import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../../../shared/shared.module';
import { NotificationComponent } from './notification.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule
  ],
  declarations: [
  	NotificationComponent
  ],
  entryComponents: [
    NotificationComponent
  ]
})
export class NotificationModule { }
