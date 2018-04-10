import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickPayListItemComponent } from './quick-pay-list-item/quick-pay-list-item.component';
import { IonicModule } from 'ionic-angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [QuickPayListItemComponent],
  entryComponents: [QuickPayListItemComponent]
})
export class QuickPayModule { }
