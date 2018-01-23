import { PersonalService } from './personal.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { PersonalComponent } from './personal.component';
import { PersonalMenuComponent } from './personal-menu/personal-menu.component';
import { ContactModule } from './contact/contact.module';
import { MessagesModule } from './messages/messages.module';
import { NotificationModule } from './notification/notification.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ContactModule,
    MessagesModule,
    NotificationModule,
    SharedModule
  ],
  declarations: [
    PersonalComponent,
    PersonalMenuComponent
  ],
  entryComponents: [
    PersonalComponent,
    PersonalMenuComponent
  ],
  providers: [
    PersonalService
  ]
})

export class PersonalModule { }
