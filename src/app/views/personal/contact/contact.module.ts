import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ContactUsersComponent } from './contact-users/contact-users.component';
import { ContactGroupsComponent } from './contact-groups/contact-groups.component';
import { ContactBusinessComponent } from './contact-business/contact-business.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ContactComponent, ContactUsersComponent, ContactGroupsComponent, ContactBusinessComponent]
})
export class ContactModule { }
