import { SocialService } from './social.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { SocialComponent } from './social.component';
import { EventsModule } from './events/events.module';
import { NearByModule } from './near-by/near-by.module';
import { NewsFeedModule } from './news-feed/news-feed.module';
import { OffersModule } from './offers/offers.module';
import { SharedModule } from '../../shared/shared.module';
import { SocialMenuComponent } from './social-menu/social-menu.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EventsModule,
    NearByModule,
    NewsFeedModule,
    OffersModule,
    SharedModule,
    IonicModule.forRoot(SocialComponent, { swipeBackEnabled: true })
  ],
  declarations: [
    SocialComponent,
    SocialMenuComponent
  ],
  entryComponents: [
    SocialComponent,
    SocialMenuComponent
  ],
  providers: [
    SocialService
  ]
})

export class SocialModule { }
