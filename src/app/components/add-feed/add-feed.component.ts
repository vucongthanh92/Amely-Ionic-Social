import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';

@Component({
  selector: 'app-add-feed',
  templateUrl: './add-feed.component.html'
})
export class AddFeedComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }
}
