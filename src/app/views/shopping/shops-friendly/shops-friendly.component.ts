import { Shop } from './../../../api/models/shop';
import { User } from './../../../api/models/user';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { ShopComponent } from '../../../components/shop/shop.component';
import { ShoppingsService } from '../../../services/shoppings.service';

@Component({
  selector: 'app-shops-friendly',
  templateUrl: './shops-friendly.component.html'
})
export class ShopsFriendlyComponent implements OnInit {
  public users: Array<User>;
  public shops: Array<Shop>;
  constructor(public nav: NavController, public appCtrl: App, public shoppingsService: ShoppingsService) { }

  ngOnInit() {
    this.shoppingsService.getFriendlyShop().subscribe(data => {
      this.shops = data.shops;
      this.users = data.owners;
    });
  }

  goToPage(value, guid) {
    switch (value) {
      case 'shop':
        this.appCtrl.getRootNav().push(ShopComponent, { guid: guid });
        break;
      default:
        break;
    }
  }

}
