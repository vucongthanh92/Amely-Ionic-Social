import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainComponent } from './layouts/main/main.component';
import { NavComponent } from './layouts/nav/nav.component';
import { ContactComponent } from './views/personal/contact/contact.component';
import { NewsFeedComponent } from './views/social/news-feed/news-feed.component';
import { ShopComponent } from './views/shopping/shop/shop.component';
import { PrivateComponent } from './views/inventory/private/private.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainComponent,
    NavComponent,
    ContactComponent,
    NewsFeedComponent,
    ShopComponent,
    PrivateComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainComponent,
    NavComponent,
    ContactComponent,
    NewsFeedComponent,
    ShopComponent,
    PrivateComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
