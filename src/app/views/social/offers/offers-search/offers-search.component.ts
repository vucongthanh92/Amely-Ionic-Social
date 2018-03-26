import { CustomService } from './../../../../services/custom.service';
import { App, AlertController, NavController } from 'ionic-angular';
import { GeolocationService } from './../../../../services/geolocation.service';
import { OffersService } from './../../../../services/offers.service';
import { Offer } from './../../../../api/models/offer';
import { Component, OnInit } from '@angular/core';
import { OffersItemDetailComponent } from '../offers-item-detail/offers-item-detail.component';

@Component({
  selector: 'app-offers-search',
  templateUrl: './offers-search.component.html'
})
export class OffersSearchComponent implements OnInit {

  private lat: number;
  private lng: number;
  private checked: string;
  private geoQueryOffer;

  public offers: Array<Offer>;
  constructor(
    private nav: NavController,
    private app: App,
    private alertCtrl: AlertController,
    private geolocationService: GeolocationService,
    private offersServie: OffersService,
    private customService: CustomService
  ) {
    this.lat = Number(localStorage.getItem("lat"));
    this.lng = Number(localStorage.getItem("lng"));
    // let geoQueryOffer = this.geolocationService.getOffers(this.lat, this.lng);
    // geoQueryOffer.on("key_entered", function (key, location, distance) {
    //   // console.log(key + " user query at " + location + " (" + distance + " km from center)");
    // });
  }

  ngOnInit() {
    // this.offersServie.getOffers(0, 9999, 'friends').subscribe(data => {
    //   if (data instanceof Array) {
    //     this.offers = data;
    //   }
    // })
  }

  doRadio() {
    const alert = this.alertCtrl.create();
    alert.setTitle('Lightsaber color');

    alert.addInput({
      type: 'radio',
      label: 'Bạn bè trong danh bạ',
      value: 'friends',
      checked: (this.checked == "friends")
    });

    alert.addInput({
      type: 'radio',
      label: 'Mọi người xung quanh',
      value: 'public',
      checked: (this.checked == "public")
    });

    alert.addInput({
      type: 'radio',
      label: 'Mọi người tại vị trí bản đồ',
      value: 'location',
      checked: (this.checked == "location")
    });

    alert.addButton('Hủy');
    alert.addButton({
      text: 'Tìm kiếm',
      handler: (data: any) => {
        this.checked = data;
        switch (data) {
          case 'friends':
            this.offers = [];
            this.offersServie.getOffers(0, 9999, 'friends').subscribe(data => {
              if (data instanceof Array) {
                this.offers = data;
              }
            })
            break;
          case 'public':
            console.log('public');
            console.log(this.lat + "  " + this.lng);

            this.geoQueryOffer = this.geolocationService.getOffers(this.lat, this.lng);
            var that = this;
            that.offers = [];
            this.geoQueryOffer.on("key_entered", function (key, location, distance) {
              console.log(key);
              console.log(key + " user query at " + location + " (" + distance + " km from center)");
              that.offersServie.getOffer(key).subscribe(data => {
                if (data.owner.guid != that.customService.user_current.guid) {
                  that.offers.push(data);
                }
              });
            });
            break;
          case 'location':

            break;
          default:
            break;
        }
      }
    });

    alert.present();
  }

  changePage(offer) {
    // this.nav.push(OffersItemDetailComponent, { param: offer });
    // this.nav.setRoot(OffersItemDetailComponent, { param: offer });
    // this.nav.
    // console.log(this.appCtrl.getActiveNav().canGoBack());
    // this.nav.push(OffersItemDetailComponent, { param: offer });
    this.app.getRootNav().push(OffersItemDetailComponent, {
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

  bookmarkOffer(offer: Offer) {
    this.offersServie.bookmarkOffer(offer.guid).subscribe(data => {
      if (data.status) {
        this.customService.toastMessage('Bookmark thành công', 'bottom', 3000);
      } else {
        this.customService.toastMessage('Trao đổi đã bookmark', 'bottom', 3000);
      }
    });
  }
}
