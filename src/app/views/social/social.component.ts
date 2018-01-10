import { Component, OnInit } from '@angular/core';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { OffersComponent } from './offers/offers.component';
import { NearByComponent } from './near-by/near-by.component';
import { EventsComponent } from './events/events.component';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html'
})
export class SocialComponent implements OnInit {

  tab1Root = NewsFeedComponent;
  tab2Root = OffersComponent;
  tab3Root = NearByComponent;
  tab4Root = EventsComponent;

  constructor() { }

  ngOnInit() {
  }

}
