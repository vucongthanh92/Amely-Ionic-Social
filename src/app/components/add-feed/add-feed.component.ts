import { Component, OnInit } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { SocialComponent } from '../../views/social/social.component';

@Component({
  selector: 'app-add-feed',
  templateUrl: './add-feed.component.html'
})
export class AddFeedComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }
}
