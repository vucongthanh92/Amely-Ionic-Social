import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import { OfficialAccountComponent } from './official-account/official-account.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserComponent, GroupComponent, OfficialAccountComponent]
})
export class ContactModule { }
