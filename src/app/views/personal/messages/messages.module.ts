import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../../../shared/shared.module';
import { MessagesComponent } from './messages.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule
  ],
  declarations: [
  	MessagesComponent
  ],
  entryComponents: [
    MessagesComponent
  ]
})
export class MessagesModule { }
