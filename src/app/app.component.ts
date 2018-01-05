import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MainComponent } from './layouts/main/main.component';
import { NavComponent } from './layouts/nav/nav.component';
import { ContactComponent } from './views/personal/contact/contact.component';
import { NewsFeedComponent } from './views/social/news-feed/news-feed.component';
import { ShopComponent } from './views/shopping/shop/shop.component';
import { PrivateComponent } from './views/inventory/private/private.component';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = MainComponent;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Contact', component: ContactComponent },
      { title: 'Social', component: NewsFeedComponent },
      { title: 'Shopping', component: ShopComponent },
      { title: 'Inventory', component: PrivateComponent },
      { title: 'Settings', component: NavComponent }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}

