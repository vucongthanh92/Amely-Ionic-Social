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
import { SigninComponent } from './authentication/signin/signin.component';
import { RegisterComponent } from './authentication/register/register.component';
import { VerifycodeComponent } from './authentication/verifycode/verifycode.component';
import { AuthenticationService } from './authentication/authentication.service';
import { GroupComponent } from './views/personal/contact/group/group.component';
import { OfficialAccountComponent } from './views/personal/contact/official-account/official-account.component';
import { UserComponent } from './views/personal/contact/user/user.component';
//INVENTORY
import { InventoryComponent } from './views/inventory/inventory.component';
import { InventoryPublicComponent } from './views/inventory/inventory-public/inventory-public.component';
import { InventoryPrivateComponent } from './views/inventory/inventory-private/inventory-private.component';
import { InventoryHistoryComponent } from './views/inventory/inventory-history/inventory-history.component';
//SETTING
import { SettingsComponent } from './views/settings/settings.component';
import { SettingPrivateComponent } from './views/settings/setting-private/setting-private.component';
import { SettingSecurityComponent } from './views/settings/setting-security/setting-security.component';
import { SettingGeneralComponent } from './views/settings/setting-general/setting-general.component';
// FEED
import { FeedComponent } from './components/feed/feed.component';

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
    ShopsComponent,
    SigninComponent,
    PersonalComponent,
    GroupComponent,
    OfficialAccountComponent,
    UserComponent,
    RegisterComponent,
    VerifycodeComponent,
    // INVENTORY
    InventoryComponent,
    InventoryPrivateComponent,
    InventoryPublicComponent,
    InventoryHistoryComponent,
    // SETTING
    SettingsComponent,
    SettingGeneralComponent,
    SettingSecurityComponent,
    SettingPrivateComponent,
    FeedComponent,
    FeedComponent
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
    SigninComponent,
    PersonalComponent,
    GroupComponent,
    OfficialAccountComponent,
    UserComponent,
    RegisterComponent,
    VerifycodeComponent,
    //INVENTORY
    InventoryComponent,
    InventoryPrivateComponent,
    InventoryPublicComponent,
    InventoryHistoryComponent,
    // SETTING
    SettingsComponent,
    SettingGeneralComponent,
    SettingPrivateComponent,
    SettingSecurityComponent,
    // FEED
    FeedComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticationService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
