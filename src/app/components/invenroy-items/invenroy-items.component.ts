import { Component, OnInit } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-invenroy-items',
  templateUrl: './invenroy-items.component.html'
})
export class InvenroyItemsComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }

  goToPage(value) {
    switch (value) {
      case 'item':
        this.appCtrl.getRootNav().push(ItemComponent);
        break;
      case 'default':
        break;
    }
  }

}
