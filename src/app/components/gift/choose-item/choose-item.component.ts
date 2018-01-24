import { Component, OnInit } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { GiftItemDetailComponent } from '../gift-item-detail/gift-item-detail.component';

@Component({
  selector: 'app-choose-item',
  templateUrl: './choose-item.component.html'
})
export class ChooseItemComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }

  goToDetail(){
    this.appCtrl.getRootNav().push(GiftItemDetailComponent);
  }
}
