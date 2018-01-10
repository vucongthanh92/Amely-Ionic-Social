import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MainComponent } from './layouts/main/main.component';
import { NavComponent } from './layouts/nav/nav.component';
import { PersonalComponent } from './views/personal/personal.component';
import { ContactComponent } from './views/personal/contact/contact.component';
import { SocialComponent } from './views/social/social.component';
import { NewsFeedComponent } from './views/social/news-feed/news-feed.component';
import { ShopsComponent } from './views/shopping/shops/shops.component';
import { InventoryComponent } from './views/inventory/inventory.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { SettingsComponent } from './views/settings/settings.component';
import { FeedComponent } from './components/feed/feed.component';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = SigninComponent;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Contact', component: PersonalComponent },
      { title: 'Social', component: SocialComponent },
      { title: 'Shopping', component: ShopsComponent },
      { title: 'Inventory', component: InventoryComponent },
      { title: 'Settings', component: SettingsComponent }
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
