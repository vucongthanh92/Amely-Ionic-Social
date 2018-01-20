import { Component, OnInit, ViewChild } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { AlbumComponent } from '../album/album.component';
import { FriendsComponent } from '../friends/friends.component';
import { ShopComponent } from '../shop/shop.component';
import { MessageComponent } from '../message/message.component';
import { GiftComponent } from '../gift/gift.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})

export class UserComponent {
  
  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }

  changePageAlbum() {
    this.nav.push(AlbumComponent);
  }

  changePageFriends() {
    this.nav.push(FriendsComponent);
  }

  refreshPage(){
    this.nav.setRoot(UserComponent);
  }

  doRefresh(refresher: Refresher) {
    console.log('DOREFRESH', refresher);

      refresher.complete();
  }

  doPulling(refresher: Refresher) {
    console.log('DOPULLING', refresher.progress);
  }

  newfeedsPage = true;
  imagesPage = false;
  friendsPage = false;
  userTab = 'newfeeds';

  goToPage(value) {
    switch (value) {
      case 'newfeeds':
        this.newfeedsPage = true;
        this.imagesPage = false;
        this.friendsPage = false;
        break;
      case 'images':
        this.newfeedsPage = false;
        this.imagesPage = true;
        this.friendsPage = false;
        break;
      case 'friends':
        this.newfeedsPage = false;
        this.imagesPage = false;
        this.friendsPage = true;
        break;
      case 'shop':
        this.nav.push(ShopComponent);
        break;
      case 'gift':
        this.appCtrl.getRootNav().push(GiftComponent);
        break;
      case 'chat':
        this.appCtrl.getRootNav().push(MessageComponent);
        break;
      default:
        break;
    }
  }
}
