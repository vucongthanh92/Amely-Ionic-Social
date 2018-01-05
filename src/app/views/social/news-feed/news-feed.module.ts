import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedsComponent } from './feeds/feeds.component';
import { NewsFeedComponent } from './news-feed.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FeedsComponent, NewsFeedComponent]
})
export class NewsFeedModule { }
