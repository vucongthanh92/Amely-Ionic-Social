import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';
import { AlbumComponent } from '../album/album.component';
import { FriendsComponent } from '../friends/friends.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {
  constructor(public nav: NavController) {
  }

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
}
