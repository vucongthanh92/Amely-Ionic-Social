import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
@Component({
  selector: 'app-gift-item-detail',
  templateUrl: './gift-item-detail.component.html'
})
export class GiftItemDetailComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) { }

  ngOnInit() {
  }
}
