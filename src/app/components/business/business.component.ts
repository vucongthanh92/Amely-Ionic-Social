import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { GiftComponent } from '../gift/gift.component';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html'
})
export class BusinessComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }

  newfeedsPage = true;

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
