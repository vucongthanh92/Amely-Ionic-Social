import { PaymentService } from './services/payment.service';
import { ShopsService } from './services/shops.service';
import { GeolocationService } from './services/geolocation.service';
import { GiftsService } from './services/gifts.service';
import { EventsService } from './services/events.service';
import { ProductsService } from './services/products.service';
import { PhotosService } from './services/photos.service';
import { MessagesService } from './services/messages.service';
import { GroupService } from './services/group.service';
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
import { MainMenuComponent } from './layout/main-menu/main-menu.component';
import { UserService } from './services/user.service';
import { InventoriesService } from './services/inventories.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { ShoppingsService } from './services/shoppings.service';
import { CustomService } from './services/custom.service';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { TransactionsService } from './services/transactions.service';
import { OffersService } from './services/offers.service';
import { Geolocation } from '@ionic-native/geolocation';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BusinessService } from './services/business.service';
import { SearchService } from './services/search.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OfferService } from './services/offer.service';

export const firebaseConfig = {
  apiKey: "AIzaSyDT1wlI_BKGDVBVxf6wiWY4Jn3iyCntxPs",
  authDomain: "ezqua-44ed9.firebaseio.com",
  databaseURL: "https://ezqua-44ed9.firebaseio.com",
  storageBucket: "ezqua-44ed9.appspot.com",
  projectId: "ezqua-44ed9",
  messagingSenderId: "29502497091"
};

@NgModule({
  declarations: [
    MyApp,
    MainMenuComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { tabsHideOnSubPages: true }),
    IonicPageModule.forChild(MainMenuComponent),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AuthenticationModule,
    SharedModule,
    SocialModule,
    ShoppingModule,
    PersonalModule,
    InventoriesModule,
    SettingsModule,
    ApiModule,
    MomentModule,
    NgxQRCodeModule,
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
    GroupService,
    InventoriesService,
    ShoppingsService,
    ProductsService,
    CustomService,
    EventsService,
    PhotosService,
    TransactionsService,
    OffersService,
    GiftsService,
    GeolocationService,
    ShopsService,
    BusinessService,
    PaymentService,
    SearchService,
    OfferService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Camera,
    FilePath,
    Geolocation,
    File,
    BarcodeScanner,
    InAppBrowser
  ]
})
export class AppModule { }
