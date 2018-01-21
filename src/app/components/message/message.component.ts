import { Component, OnInit } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { GiftComponent } from '../gift/gift.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }

  newfeedsPage = true;
  membersPage = false;
  groupTab = 'newfeed';

  goToPage(value) {
    switch (value) {
      case 'gift':
        this.appCtrl.getRootNav().push(GiftComponent);
        break;
      default:
        break;
    }
  }

}
