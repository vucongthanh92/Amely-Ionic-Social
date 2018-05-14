import { CustomService } from './../../../../services/custom.service';
import { ActionSheetController, AlertController, NavController, App } from 'ionic-angular';
import { User } from './../../../../api/models/user';
import { Offer } from './../../../../api/models/offer';
import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../../../services/offers.service';
import { OffersItemDetailComponent } from '../offers-item-detail/offers-item-detail.component';

@Component({
  selector: 'app-offer-bookmark',
  templateUrl: './offer-bookmark.component.html'
})
export class OfferBookmarkComponent implements OnInit {

  offers: Offer[] = [];
  users: User[] = [];
  constructor(private offerService: OffersService, private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController,
    private customService: CustomService, private nav: NavController, private appCtrl: App) { }

  ngOnInit() {
    this.loadData(5);
  }

  loadData(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.offerService.getBookmarks().subscribe(data => {
      this.offers = data.offer;
      this.users = data.users;
    }, err => this.loadData(--retry))
  }

  changePage(offer: Offer) {
    this.appCtrl.getRootNav().push(OffersItemDetailComponent, {
      callback: this.myCallbackFunction,
      param: offer
    });
  }

  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      this.nav.setRoot(this.nav.getActive().component);
      resolve();
    });
  }

  openMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Xóa danh sách bookmark',
          handler: () => {
            let alert = this.alertCtrl.create({
              title: 'Xác nhận',
              message: 'Xóa danh sách bookmark trao đổi .',
              buttons: [
                {
                  text: 'Từ chối',
                  role: 'cancel',
                  handler: () => {
                  }
                },
                {
                  text: 'Đồng ý',
                  handler: () => {
                    this.retryDeleteOffer(5);
                  }
                }
              ]
            });
            alert.present();
          }
        },
      ]
    });

    actionSheet.present();
  }

  retryDeleteOffer(retry) {
    if (retry == 0) return;
    this.offerService.deleteBookmark().subscribe(data => {
      if (data.status) {
        this.customService.toastMessage('Thành công', 'bottom', 3000);
        this.nav.pop();
      } else {
        this.customService.toastMessage('Xóa danh sách thất bại', 'bottom', 3000);
      }
    }, err => this.retryDeleteOffer(--retry))
  }
}

