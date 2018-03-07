import { LaddaModule } from 'angular2-ladda';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { ContactComponent } from './contact.component';
import { ContactUsersComponent } from './contact-users/contact-users.component';
import { ContactGroupsComponent } from './contact-groups/contact-groups.component';
import { ContactBusinessComponent } from './contact-business/contact-business.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule
  ],
  declarations: [
  	ContactComponent, 
  	ContactUsersComponent, 
  	ContactGroupsComponent, 
  	ContactBusinessComponent
  ],
  entryComponents: [
    ContactComponent,
    ContactUsersComponent, 
  	ContactGroupsComponent, 
  	ContactBusinessComponent
  ]
})
export class ContactModule { }
