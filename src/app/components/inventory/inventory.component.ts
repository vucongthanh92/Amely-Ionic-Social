import { Component, OnInit } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { InvenroyItemsComponent } from '../invenroy-items/invenroy-items.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html'
})
export class InventoryComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }

  goToPage(value) {
    switch (value) {
      case 'items':
        this.appCtrl.getRootNav().push(InvenroyItemsComponent);
        break;
      case 'default':
        break;
    }
  }
}
