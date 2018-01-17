import { Component, OnInit } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { AddFeedComponent } from '../../../components/add-feed/add-feed.component';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html'
})
export class NewsFeedComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }

  addNewFeed() {
  	this.appCtrl.getRootNav().setRoot(AddFeedComponent);
  }
}
