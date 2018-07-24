import { ProductSnapshotComponent } from './../components/product-snapshot/product-snapshot.component';
import { PaymentMethodComponent } from './../components/payment-method/payment-method.component';
import { QuickPayModule } from './../modules/quick-pay/quick-pay.module';
import { CategoriesAllComponent } from './../components/categories-all/categories-all.component';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { HistoryModule } from './../modules/history/history.module';
import { UserBlockListComponent } from './../components/user/user-block-list/user-block-list.component';
import { QrComponent } from './../components/qr/qr.component';
import { GroupMenuComponent } from './../components/group/group-menu/group-menu.component';
import { ShopFeatureComponent } from './../components/shop-feature/shop-feature.component';
import { GiftDetailComponent } from './../components/gift/gift-detail/gift-detail.component';
import { DeliveryModule } from './../modules/delivery/delivery.module';
import { WithdrawnModule } from './../modules/withdrawn/withdrawn.module';
import { UserUpdateComponent } from './../components/user/user-update/user-update.component';
import { CreateShopComponent } from './../components/create-shop/create-shop.component';
import { EventMenuComponent } from './../components/event/event-menu/event-menu.component';
import { EventComponent } from './../components/event/event.component';
import { ModalCounterOfferComponent } from './../components/counters-offer/modal-counter-offer/modal-counter-offer.component';
import { CountersOfferComponent } from './../components/counters-offer/counters-offer.component';
import { InventoryConfirmGiftComponent } from './../components/inventory-confirm-gift/inventory-confirm-gift.component';
import { InventoryTargetsGiftComponent } from './../components/inventory-targets-gift/inventory-targets-gift.component';
import { ChosenItemComponent } from './../components/chosen-item/chosen-item.component';
import { PaymentModule } from './../modules/payment/payment.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { InventoryListItemsComponent } from './../components/inventory-list-items/inventory-list-items.component';
import { FeedsComponent } from './../components/feeds/feeds.component';
import { GiftItemDetailComponent } from './../components/gift/gift-item-detail/gift-item-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { CartModule } from '../modules/cart/cart.module';

import { CategoriesComponent } from '../components/categories/categories.component';
import { FeedComponent } from '../components/feed/feed.component';
import { FeedMenuComponent } from '../components/feed/feed-menu/feed-menu.component';
import { ProductsFeatureComponent } from '../components/products-feature/products-feature.component';
import { UserComponent } from '../components/user/user.component';
import { AlbumComponent } from '../components/album/album.component';
import { FriendsComponent } from '../components/friends/friends.component';
import { AddFeedComponent } from '../components/add-feed/add-feed.component';
import { CreateOfferComponent } from '../components/create-offer/create-offer.component';
import { CreateEventComponent } from '../components/create-event/create-event.component';
import { ShopComponent } from '../components/shop/shop.component';
import { ProductComponent } from '../components/product/product.component';
import { MessageComponent } from '../components/message/message.component';
import { GroupComponent } from '../components/group/group.component';
import { BusinessComponent } from '../components/business/business.component';
import { GiftComponent } from '../components/gift/gift.component';
import { ProductCategoryComponent } from '../components/product-category/product-category.component';
import { ProductAllComponent } from '../components/product-all/product-all.component';
import { InventoryComponent } from '../components/inventory/inventory.component';
import { InvenroyItemsComponent } from '../components/invenroy-items/invenroy-items.component';
import { ItemComponent } from '../components/item/item.component';
import { FindFriendComponent } from '../components/find-friend/find-friend.component';
import { AddFriendComponent } from '../components/add-friend/add-friend.component';
import { NoteFriendComponent } from '../components/note-friend/note-friend.component';
import { AddGroupComponent } from '../components/add-group/add-group.component';
import { ChooseItemComponent } from '../components/gift/choose-item/choose-item.component';
import { CommentsComponent } from '../components/comments/comments.component';
import { SearchComponent } from '../components/search/search.component';
import { OffersItemDetailComponent } from '../views/social/offers/offers-item-detail/offers-item-detail.component';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { ChangePhonenumberComponent } from '../components/change-phonenumber/change-phonenumber.component';
import { InventoryGiftComponent } from '../components/inventory-gift/inventory-gift.component';
import { LaddaModule } from 'angular2-ladda';
import { WalletModule } from './../modules/wallet/wallet.module';
import { TimerComponent } from '../components/timer/timer.component';
import { InventoryTargetGiftComponent } from '../components/inventory-target-gift/inventory-target-gift.component';
import { UserMenuComponent } from '../components/user/user-menu/user-menu.component';
import { GiftHistoryComponent } from '../components/gift/gift-history/gift-history.component';
import { DepositModule } from '../modules/deposit/deposit.module';
import { FeedDetailComponent } from '../components/feed/feed-detail/feed-detail.component';
import { MapComponent } from '../components/map/map.component';
import { LocationComponent } from '../components/location/location.component';
import { ModalImageUserComponent } from '../components/modal-image/modal-image-user/modal-image-user.component';
import { ModalImageFeedComponent } from '../components/modal-image/modal-image-feed/modal-image-feed.component';
import { ModalImageComponent } from '../components/modal-image/modal-image.component';
import { BusinessMenuComponent } from '../components/business/business-menu/business-menu.component';
import { RenewalItemComponent } from '../components/renewal-item/renewal-item.component';
import { BannerComponent } from '../components/banner/banner.component';
import { ForgotChangePassComponent } from '../authentication/forgot/forgot-change-pass/forgot-change-pass.component';
import { ForgotVertifyComponent } from '../authentication/forgot/forgot-vertify/forgot-vertify.component';
// import { DecodeHtmlEntitiesModule } from 'decode-html-entities';
// import { WalletModule } from './../modules/wallet/wallet.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MomentModule,
    PaymentModule,
    NgxQRCodeModule,
    CartModule,
    WalletModule,
    DepositModule,
    WithdrawnModule,
    DeliveryModule,
    HistoryModule,
    QuickPayModule,
    IonicImageViewerModule,
    LaddaModule.forRoot({
      style: "contract"
    })
  ],
  declarations: [
    CategoriesComponent,
    ProductsFeatureComponent,
    FeedComponent,
    UserComponent,
    AlbumComponent,
    FriendsComponent,
    AddFeedComponent,
    CreateOfferComponent,
    CreateEventComponent,
    ShopComponent,
    ProductComponent,
    FeedMenuComponent,
    MessageComponent,
    GroupComponent,
    BusinessComponent,
    GiftComponent,
    ProductCategoryComponent,
    ProductAllComponent,
    InventoryComponent,
    InvenroyItemsComponent,
    ItemComponent,
    FindFriendComponent,
    AddFriendComponent,
    NoteFriendComponent,
    AddGroupComponent,
    ChooseItemComponent,
    GiftItemDetailComponent,
    InventoryListItemsComponent,
    FeedsComponent,
    CommentsComponent,
    OffersItemDetailComponent,
    SearchComponent,
    ChangePasswordComponent,
    ChangePhonenumberComponent,
    InventoryGiftComponent,
    ChosenItemComponent,
    TimerComponent,
    InventoryTargetGiftComponent,
    InventoryTargetsGiftComponent,
    InventoryConfirmGiftComponent,
    CountersOfferComponent,
    ModalCounterOfferComponent,
    EventComponent,
    EventMenuComponent,
    CreateShopComponent,
    UserMenuComponent,
    UserUpdateComponent,
    GiftHistoryComponent,
    GiftDetailComponent,
    FeedDetailComponent,
    ShopFeatureComponent,
    GroupMenuComponent,
    QrComponent,
    UserBlockListComponent,
    MapComponent,
    CategoriesAllComponent,
    LocationComponent,
    ModalImageUserComponent,
    ModalImageFeedComponent,
    ModalImageComponent,
    BusinessMenuComponent,
    RenewalItemComponent,
    BannerComponent,
    ForgotChangePassComponent,ForgotVertifyComponent,
    PaymentMethodComponent,
    ProductSnapshotComponent
  ],
  entryComponents: [
    CategoriesComponent,
    ProductsFeatureComponent,
    FeedComponent,
    UserComponent,
    AlbumComponent,
    FriendsComponent,
    AddFeedComponent,
    CreateOfferComponent,
    CreateEventComponent,
    ShopComponent,
    ProductComponent,
    FeedMenuComponent,
    MessageComponent,
    GroupComponent,
    BusinessComponent,
    GiftComponent,
    ProductCategoryComponent,
    ProductAllComponent,
    InventoryComponent,
    InvenroyItemsComponent,
    ItemComponent,
    FindFriendComponent,
    AddFriendComponent,
    NoteFriendComponent,
    AddGroupComponent,
    ChooseItemComponent,
    GiftItemDetailComponent,
    InventoryListItemsComponent,
    FeedsComponent,
    CommentsComponent,
    OffersItemDetailComponent,
    SearchComponent,
    ChangePasswordComponent,
    ChangePhonenumberComponent,
    InventoryGiftComponent,
    ChosenItemComponent,
    TimerComponent,
    InventoryTargetGiftComponent,
    InventoryTargetsGiftComponent,
    InventoryConfirmGiftComponent,
    CountersOfferComponent,
    ModalCounterOfferComponent,
    EventComponent,
    EventMenuComponent,
    CreateShopComponent,
    UserMenuComponent,
    UserUpdateComponent,
    GiftHistoryComponent,
    GiftDetailComponent,
    FeedDetailComponent,
    ShopFeatureComponent,
    GroupMenuComponent,
    QrComponent,
    UserBlockListComponent,
    MapComponent,
    CategoriesAllComponent,
    LocationComponent,
    ModalImageUserComponent,
    ModalImageFeedComponent,
    ModalImageComponent,
    BusinessMenuComponent,
    RenewalItemComponent,
    BannerComponent,
    ForgotChangePassComponent, ForgotVertifyComponent,
    PaymentMethodComponent,
    ProductSnapshotComponent
  ],
  exports: [
    CategoriesComponent,
    ProductsFeatureComponent,
    FeedComponent,
    UserComponent,
    AlbumComponent,
    FriendsComponent,
    AddFeedComponent,
    CreateOfferComponent,
    CreateEventComponent,
    ShopComponent,
    ProductComponent,
    FeedMenuComponent,
    MessageComponent,
    GroupComponent,
    BusinessComponent,
    GiftComponent,
    ProductCategoryComponent,
    ProductAllComponent,
    InventoryComponent,
    InvenroyItemsComponent,
    ItemComponent,
    FindFriendComponent,
    AddFriendComponent,
    NoteFriendComponent,
    AddGroupComponent,
    ChooseItemComponent,
    GiftItemDetailComponent,
    InventoryListItemsComponent,
    FeedsComponent,
    CommentsComponent,
    OffersItemDetailComponent,
    SearchComponent,
    ChangePasswordComponent,
    ChangePhonenumberComponent,
    InventoryGiftComponent,
    ChosenItemComponent,
    TimerComponent,
    InventoryTargetGiftComponent,
    InventoryTargetsGiftComponent,
    InventoryConfirmGiftComponent,
    CountersOfferComponent,
    ModalCounterOfferComponent,
    EventComponent,
    EventMenuComponent,
    CreateShopComponent,
    UserMenuComponent,
    UserUpdateComponent,
    GiftHistoryComponent,
    GiftDetailComponent,
    FeedDetailComponent,
    ShopFeatureComponent,
    GroupMenuComponent,
    QrComponent,
    UserBlockListComponent,
    MapComponent,
    CategoriesAllComponent,
    LocationComponent,
    ModalImageUserComponent,
    ModalImageFeedComponent,
    ModalImageComponent,
    BusinessMenuComponent,
    RenewalItemComponent,
    BannerComponent,
    ForgotChangePassComponent,
    ForgotVertifyComponent,
    PaymentMethodComponent,
    ProductSnapshotComponent
  ]
})
export class SharedModule { }
