import { AuthenticationModule } from './authentication/authentication.module';
import { SharedModule } from './shared/shared.module';
import { SocialModule } from './views/social/social.module';
import { ShoppingModule } from './views/shopping/shopping.module';
import { PersonalModule } from './views/personal/personal.module';
import { InventoryModule } from './views/inventory/inventory.module';
import { SettingsModule } from './views/settings/settings.module';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainComponent } from './layouts/main/main.component';
import { NavComponent } from './layouts/nav/nav.component';

// SERVICES

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AuthenticationModule,
    SharedModule,
    SocialModule,
    ShoppingModule,
    PersonalModule,
    InventoryModule,
    SettingsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainComponent,
    NavComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
