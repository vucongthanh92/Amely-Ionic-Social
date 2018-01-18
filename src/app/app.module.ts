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

// COMPONENTS
import { CategoriesComponent } from './components/categories/categories.component';
import { FeedComponent } from './components/feed/feed.component';
import { ProductsFeatureComponent } from './components/products-feature/products-feature.component';
import { UserComponent } from './components/user/user.component';
import { AlbumComponent } from './components/album/album.component';
import { FriendsComponent } from './components/friends/friends.component';
import { AddFeedComponent } from './components/add-feed/add-feed.component';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
// AUTHENTICATION
import { SigninComponent } from './authentication/signin/signin.component';
import { RegisterComponent } from './authentication/register/register.component';
import { VerifycodeComponent } from './authentication/verifycode/verifycode.component';
import { AuthenticationService } from './authentication/authentication.service';
// PERSONAL
import { PersonalMenuComponent } from './views/personal/personal-menu/personal-menu.component';
import { PersonalComponent } from './views/personal/personal.component';
import { ContactComponent } from './views/personal/contact/contact.component';
import { MessageComponent } from './views/personal/message/message.component';
import { NotificationComponent } from './views/personal/notification/notification.component';
    // CONTACT
    import { ContactUsersComponent } from './views/personal/contact/contact-users/contact-users.component';
    import { ContactGroupsComponent } from './views/personal/contact/contact-groups/contact-groups.component';
    import { ContactBusinessComponent } from './views/personal/contact/contact-business/contact-business.component';
// SOCIAL
import { SocialComponent } from './views/social/social.component';
import { NewsFeedComponent } from './views/social/news-feed/news-feed.component';
import { OffersComponent } from './views/social/offers/offers.component';
import { NearByComponent } from './views/social/near-by/near-by.component';
import { EventsComponent } from './views/social/events/events.component';
    // NEARBY
    import { NearByUserComponent } from './views/social/near-by/near-by-user/near-by-user.component';
    import { NearByShopComponent } from './views/social/near-by/near-by-shop/near-by-shop.component';
    // OFFERS
    import { OffersMyselfComponent } from './views/social/offers/offers-myself/offers-myself.component';
    import { OffersPendingComponent } from './views/social/offers/offers-pending/offers-pending.component';
    import { OffersSearchComponent } from './views/social/offers/offers-search/offers-search.component';
    // EVENTS 
    import { EventsUserComponent } from './views/social/events/events-user/events-user.component';
    import { EventsGuestComponent } from './views/social/events/events-guest/events-guest.component';
    import { EventsHistoryComponent } from './views/social/events/events-history/events-history.component';
// SHOPPING
import { ShoppingComponent } from './views/shopping/shopping.component';
import { ShopsComponent } from './views/shopping/shops/shops.component';
import { VouchersComponent } from './views/shopping/vouchers/vouchers.component';
import { ShopsFriendlyComponent } from './views/shopping/shops-friendly/shops-friendly.component';
// INVENTORY
import { InventoryComponent } from './views/inventory/inventory.component';
import { InventoryPublicComponent } from './views/inventory/inventory-public/inventory-public.component';
import { InventoryPrivateComponent } from './views/inventory/inventory-private/inventory-private.component';
import { InventoryHistoryComponent } from './views/inventory/inventory-history/inventory-history.component';
// SETTING
import { SettingsComponent } from './views/settings/settings.component';
import { SettingPrivateComponent } from './views/settings/setting-private/setting-private.component';
import { SettingSecurityComponent } from './views/settings/setting-security/setting-security.component';
import { SettingGeneralComponent } from './views/settings/setting-general/setting-general.component';


// FEED

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainComponent,
    NavComponent,
    NewsFeedComponent,
    PersonalComponent,
    // COMPONENTS
    CategoriesComponent,
    ProductsFeatureComponent,
    FeedComponent,
    UserComponent,
    AlbumComponent,
    FriendsComponent,
    AddFeedComponent,
    CreateOfferComponent,
    // AUTHENTICATION
    SigninComponent,
    RegisterComponent,
    VerifycodeComponent,
    // PERSONAL
    PersonalMenuComponent,
    ContactComponent,
    MessageComponent,
    NotificationComponent,
        // CONTACT
        ContactUsersComponent,
        ContactGroupsComponent,
        ContactBusinessComponent,
    // SOCIAL
    SocialComponent,
    OffersComponent,
    NearByComponent,
    EventsComponent,
        // NEARBY
        NearByUserComponent,
        NearByShopComponent,
        // OFFERS
        OffersMyselfComponent,
        OffersPendingComponent,
        OffersSearchComponent,
        // EVENTS 
        EventsUserComponent,
        EventsGuestComponent,
        EventsHistoryComponent,
    // SHOPPING
    ShoppingComponent,
    ShopsComponent,
    VouchersComponent,
    ShopsFriendlyComponent,
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
    CreateEventComponent,
    
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
    NewsFeedComponent,
    PersonalComponent,
    // COMPONENTS
    CategoriesComponent,
    ProductsFeatureComponent,
    FeedComponent,
    UserComponent,
    AlbumComponent,
    FriendsComponent,
    AddFeedComponent,
    CreateOfferComponent,
    CreateEventComponent,
    // AUTHENTICATION
    SigninComponent,
    RegisterComponent,
    VerifycodeComponent,
    // PERSONAL
    PersonalMenuComponent,
    ContactComponent,
    MessageComponent,
    NotificationComponent,
        // CONTACT
        ContactUsersComponent,
        ContactGroupsComponent,
        ContactBusinessComponent,
    // SOCIAL
    SocialComponent,
    OffersComponent,
    NearByComponent,
    EventsComponent,
        // NEARBY
        NearByUserComponent,
        NearByShopComponent,
        // OFFERS
        OffersMyselfComponent,
        OffersPendingComponent,
        OffersSearchComponent,
        // EVENTS 
        EventsUserComponent,
        EventsGuestComponent,
        EventsHistoryComponent,
    // SHOPPING
    ShoppingComponent,
    ShopsComponent,
    VouchersComponent,
    ShopsFriendlyComponent,
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
