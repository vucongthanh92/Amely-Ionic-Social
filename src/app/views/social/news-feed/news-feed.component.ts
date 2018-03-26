import { CustomService } from './../../../services/custom.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
})

export class NewsFeedComponent implements OnInit {

  feed_type = "home";
  constructor(
    public nav: NavController,
    public appCtrl: App,
    public customService: CustomService
  ) { }

  ngOnInit() { }



}
