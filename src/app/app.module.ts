import { MessagesService } from './services/messages.service';
import { FeedsService } from './services/feeds.service';
import { ApiModule } from './api/api.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { SharedModule } from './shared/shared.module';
import { SocialModule } from './views/social/social.module';
import { ShoppingModule } from './views/shopping/shopping.module';
import { PersonalModule } from './views/personal/personal.module';
import { InventoriesModule } from './views/inventories/inventories.module';
import { SettingsModule } from './views/settings/settings.module';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { MomentModule } from 'angular2-moment';
import { SigninComponent } from './authentication/signin/signin.component';
import { MainMenuComponent } from './layout/main-menu/main-menu.component';
import { UserService } from './services/user.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

export const firebaseConfig = {
  apiKey: "AIzaSyDT1wlI_BKGDVBVxf6wiWY4Jn3iyCntxPs",
  authDomain: "ezqua-44ed9.firebaseio.com",
  databaseURL: "https://ezqua-44ed9.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "29502497091"
};

@NgModule({
  declarations: [
    MyApp,
    MainMenuComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { tabsHideOnSubPages: true}),
    IonicPageModule.forChild(MainMenuComponent),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AuthenticationModule,
    SharedModule,
    SocialModule,
    ShoppingModule,
    PersonalModule,
    InventoriesModule,
    SettingsModule,
    ApiModule,
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FeedsService,
    UserService,
    MessagesService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
