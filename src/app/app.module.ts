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

@NgModule({
  declarations: [
    MyApp,
    MainMenuComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicPageModule.forChild(MainMenuComponent),
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
