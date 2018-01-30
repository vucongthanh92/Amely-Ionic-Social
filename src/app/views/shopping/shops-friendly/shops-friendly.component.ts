import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { ShopComponent } from '../../../components/shop/shop.component';

@Component({
  selector: 'app-shops-friendly',
  templateUrl: './shops-friendly.component.html'
})
export class ShopsFriendlyComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }

  goToPage(value) {
    switch (value) {
      case 'shop':
        this.appCtrl.getRootNav().push(ShopComponent);
        break;
      default:
        break;
    }
  }

}
