import { NavController, App, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html'
})

export class EventComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App, private navParams: NavParams) {
  }

  ngOnInit() {
  }

  newfeedsPage = true;
  membersPage = false;
  eventTab = 'newfeed';

  goToPage(type, value) {
    switch (type) {
      case 'newfeed':
        this.newfeedsPage = true;
        this.membersPage = false;
        break;
      case 'members':
        this.newfeedsPage = false;
        this.membersPage = true;
        break;
      case 'gift':
        
        break;
      case 'chat':
        
        break;
      default:
        break;
    }
  }

}
