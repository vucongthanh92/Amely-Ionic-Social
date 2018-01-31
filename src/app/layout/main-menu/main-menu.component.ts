
import { Nav, MenuController, NavController } from 'ionic-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api/services/api.service';

import { PersonalComponent } from './../../views/personal/personal.component';
import { SocialComponent } from './../../views/social/social.component';
import { ShoppingComponent } from './../../views/shopping/shopping.component';
import { InventoriesComponent } from './../../views/inventories/inventories.component';
import { SettingsComponent } from './../../views/settings/settings.component';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html'
})
export class MainMenuComponent implements OnInit {
  @ViewChild(Nav) nav: Nav;
  rootPage = SocialComponent;

  pages: Array<{ title: string, component: any, image: string }>;
  loggin_user: any;
  moodLocal: any;

  constructor(
    public menuCtrl: MenuController,
    private api: ApiService
  ) {
    // this.moodLocal = [
    //   { guid: '7723', title: 'WANNA_TRADE', image: 'assets/imgs/ic_gift_1.png' },
    //   { guid: '7724', title: 'WANNA_GIFT', image: 'assets/imgs/ic_gift_4.png' },
    //   { guid: '7732', title: 'WANNA_GET', image: 'assets/imgs/ic_gift_3.png' },
    //   { guid: '7733', title: 'WANNA_DATE', image: 'assets/imgs/ic_like.png' },
    // ]
    this.moodLocal = {
      7723: { title: 'WANNA_TRADE', image: 'assets/imgs/ic_gift_1.png' },
      7724: { title: 'WANNA_GIFT', image: 'assets/imgs/ic_gift_4.png' },
      7732: { title: 'WANNA_GET', image: 'assets/imgs/ic_gift_3.png' },
      7733: { title: 'WANNA_DATE', image: 'assets/imgs/ic_like.png' },
    }
    localStorage.setItem("mood_local", JSON.stringify(this.moodLocal));
  }

  ngOnInit() {
    this.api.getProfile({}).subscribe(data => {
      this.pages = [
        { title: data.username, component: PersonalComponent, image: data.avatar },
        { title: 'XÃ HỘI', component: SocialComponent, image: 'assets/imgs/Social.png' },
        { title: 'MUA SẮM', component: ShoppingComponent, image: 'assets/imgs/Shopping.png' },
        { title: 'KHO QUÀ', component: InventoriesComponent, image: 'assets/imgs/Inventory.png' },
        { title: 'THIẾT LẬP', component: SettingsComponent, image: 'assets/imgs/Settings.png' }
      ];
      localStorage.setItem('loggin_user', JSON.stringify(data));
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.menuCtrl.close();
  }

}