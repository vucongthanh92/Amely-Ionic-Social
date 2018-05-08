import { FeedsComponent } from './../../../components/feeds/feeds.component';
import { CustomService } from './../../../services/custom.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { App, NavController } from 'ionic-angular';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
 
})

export class NewsFeedComponent implements OnInit {
  feed_type = "home";
  url1;
  @ViewChild('feeds') feeds: FeedsComponent; 
  constructor(
    public nav: NavController,
    public appCtrl: App,
    public customService: CustomService
  ) {
    // this.url ='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    // this.url1 = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    // document.getElementById('innerframetmp');

  }

  ngOnInit() { }
  // byPassUrl() {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);	
  // }

  addFeed() {
    this.feeds.addNewFeed()
  }
}
