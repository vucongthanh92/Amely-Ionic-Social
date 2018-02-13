import { CustomService } from './../../../services/custom.service';
import { User } from './../../../api/models/user';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { AddFeedComponent } from '../../../components/add-feed/add-feed.component';

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
