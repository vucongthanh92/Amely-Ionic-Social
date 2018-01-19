import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../../../shared/shared.module';
import { NewsFeedComponent } from './news-feed.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule
  ],
  declarations: [
  	NewsFeedComponent
  ],
  entryComponents: [
  	NewsFeedComponent
  ]
})
export class NewsFeedModule { }
