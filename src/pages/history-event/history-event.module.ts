import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryEventPage } from './history-event';

@NgModule({
  declarations: [
    HistoryEventPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoryEventPage),
  ],
})
export class HistoryEventPageModule {}
