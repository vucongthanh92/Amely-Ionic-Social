import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import { OfficialAccountComponent } from './official-account/official-account.component';
import { ContactComponent } from './contact.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserComponent, GroupComponent, OfficialAccountComponent, ContactComponent]
})
export class ContactModule { }
