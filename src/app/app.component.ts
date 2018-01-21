import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsFeatureComponent } from './components/products-feature/products-feature.component';
import { SigninComponent } from './authentication/signin/signin.component';

import { PersonalComponent } from './views/personal/personal.component';
import { SocialComponent } from './views/social/social.component';
import { ShoppingComponent } from './views/shopping/shopping.component';
import { InventoriesComponent } from './views/inventories/inventories.component';
import { SettingsComponent } from './views/settings/settings.component';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = SigninComponent;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menuCtrl: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Contact', component: PersonalComponent },
      { title: 'Social', component: SocialComponent },
      { title: 'Shopping', component: ShoppingComponent },
      { title: 'Inventory', component: InventoriesComponent },
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
    this.menuCtrl.close();
  }

}
