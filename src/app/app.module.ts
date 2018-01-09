import { AuthenticationModule } from './authentication/authentication.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainComponent } from './layouts/main/main.component';
import { NavComponent } from './layouts/nav/nav.component';
import { PersonalComponent } from './views/personal/personal.component';
import { ContactComponent } from './views/personal/contact/contact.component';
import { MessageComponent } from './views/personal/message/message.component';
import { NotificationComponent } from './views/personal/notification/notification.component';
import { NewsFeedComponent } from './views/social/news-feed/news-feed.component';
import { ShopsComponent } from './views/shopping/shops/shops.component';
import { PrivateComponent } from './views/inventory/private/private.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { AuthenticationService } from './authentication/authentication.service';

import { GroupComponent } from './views/personal/contact/group/group.component';
import { OfficialAccountComponent } from './views/personal/contact/official-account/official-account.component';
import { UserComponent } from './views/personal/contact/user/user.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainComponent,
    NavComponent,
    ContactComponent,
    MessageComponent,
    NotificationComponent,
    NewsFeedComponent,
    PrivateComponent,
    ShopsComponent,
    SigninComponent,
    PersonalComponent,
    GroupComponent,
    OfficialAccountComponent,
    UserComponent
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
    MessageComponent,
    NotificationComponent,
    NewsFeedComponent,
    ShopsComponent,
    PrivateComponent,
    SigninComponent,
    PersonalComponent,
    GroupComponent,
    OfficialAccountComponent,
    UserComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticationService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
