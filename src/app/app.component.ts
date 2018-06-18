import { DefaultResponse } from './api/models/default-response';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { SigninComponent } from './authentication/signin/signin.component';
import { MainMenuComponent } from './layout/main-menu/main-menu.component';
import { AuthenticationService } from './authentication/authentication.service';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  templateUrl: 'app.html',
  providers: [Keyboard, AndroidPermissions]
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  pages: Array<{ title: string, component: any, image: string }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    private keyboard: Keyboard,
    private authenticationService: AuthenticationService,
    private androidPermissions: AndroidPermissions
    // private cordova: cordova
  ) {
    this.checkLogin();
    this.initializeApp();
  }

  initializeApp() {
    // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    this.platform.ready().then(() => {
      this.keyboard.hideKeyboardAccessoryBar(false)
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString("#1d325e");
      this.splashScreen.hide();
      this.androidPermissions.requestPermissions(
        [
          this.androidPermissions.PERMISSION.CAMERA,
          this.androidPermissions.PERMISSION.CALL_PHONE,
          this.androidPermissions.PERMISSION.GET_ACCOUNTS,
          this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
          this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
        ]
      );

    });
  }

  checkLogin() {
    try {
      const dr: DefaultResponse = JSON.parse(localStorage.getItem('baer'));
      if (dr.token) {
        this.rootPage = MainMenuComponent;
        this.authenticationService.setSession(dr);
      } else this.rootPage = SigninComponent;
    } catch (error) {
      console.log(error);

      this.rootPage = SigninComponent;
    }
  }
}
