import { GiftItemDetailComponent } from './../components/gift/gift-item-detail/gift-item-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';

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


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MomentModule
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
    GiftItemDetailComponent
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
    GiftItemDetailComponent
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
    GiftItemDetailComponent
  ]
})
export class SharedModule { }
