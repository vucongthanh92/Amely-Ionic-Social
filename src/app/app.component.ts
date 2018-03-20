import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { SigninComponent } from './authentication/signin/signin.component';



@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = SigninComponent;

  pages: Array<{title: string, component: any,image: string}>;
  
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public keyboard: Keyboard
    // private cordova: cordova
  ) {
    this.initializeApp();
  }

  

  initializeApp() {
    // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    this.platform.ready().then(() => {
      this.keyboard.hideKeyboardAccessoryBar(false)
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
