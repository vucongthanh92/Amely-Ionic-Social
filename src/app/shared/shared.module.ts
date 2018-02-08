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

// import { WalletModule } from './../modules/wallet/wallet.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MomentModule,
    PaymentModule,
    NgxQRCodeModule,
    CartModule
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
    InventoryGiftComponent
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
    InventoryGiftComponent
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
    InventoryGiftComponent
  ]
})
export class SharedModule { }
