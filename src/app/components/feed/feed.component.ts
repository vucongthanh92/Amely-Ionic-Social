import { Component, OnInit, Input } from '@angular/core';
import { Nav, Platform, MenuController, NavController, PopoverController, NavParams} from 'ionic-angular';
import { FeedMenuComponent } from './feed-menu/feed-menu.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html'
})
export class FeedComponent {
  
  @Input('contents') contents: any;

  constructor(public menuCtrl: MenuController, public nav: NavController, private popoverCtrl: PopoverController) { }

  ngAfterViewInit() {
  	
  }

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(FeedMenuComponent);
    popover.present({
      ev: myEvent
    });
  }

}


