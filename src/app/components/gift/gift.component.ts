import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { ChooseItemComponent } from './choose-item/choose-item.component';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html'
})
export class GiftComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }

  goToPage(){
    this.appCtrl.getRootNav().push(ChooseItemComponent);
  }
}
