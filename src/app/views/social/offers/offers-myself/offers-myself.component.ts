import { FirebaseService } from './../../../../services/firebase.service';
import { CustomService } from './../../../../services/custom.service';
import { CreateOfferComponent } from './../../../../components/create-offer/create-offer.component';
import { Offer } from './../../../../api/models/offer';
import { OffersService } from './../../../../services/offers.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController, AlertController, LoadingController } from 'ionic-angular';
import { OffersItemDetailComponent } from '../offers-item-detail/offers-item-detail.component';

@Component({
  selector: 'app-offers-myself',
  templateUrl: './offers-myself.component.html'
})
export class OffersMyselfComponent implements OnInit {
  fakeUsers: Array<any> = new Array(10);
  public offers: Array<Offer>;
  constructor(
    private alertCtrl: AlertController,
    private customService: CustomService,
    private nav: NavController,
    private appCtrl: App,
    private fbService: FirebaseService,
    private offersService: OffersService,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.getOffers(5);
  }

  getOffers(retry) {

    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   enableBackdropDismiss: true
    // });
    // loading.present();

    if (retry == 0) {
      // loading.dismiss();
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    setTimeout(() => {
      this.offersService.getOffers(0, 9999, null).subscribe(data => {
        this.offers = []
        if (data instanceof Array) {

          this.offers = data;
          console.log(this.offers);
          
        }
        // loading.dismiss();
      }, err => this.getOffers(--retry))
    }, 2500);

  }

  counterOfferRandom(offerRandom:any){
    return + offerRandom + 1;
  }

  changePage(offer) {
    // this.nav.push(OffersItemDetailComponent, { param: offer });
    // this.nav.setRoot(OffersItemDetailComponent, { param: offer });
    // this.nav.
    // console.log(this.appCtrl.getActiveNav().canGoBack());
    // this.nav.push(OffersItemDetailComponent, { param: offer });
    this.appCtrl.getRootNav().push(OffersItemDetailComponent, {
      callback: this.myCallbackFunction,
      param: offer
    });
  }

  goToPage() {
    this.appCtrl.getRootNav().push(CreateOfferComponent, { callback: this.reloadCallback });
  }

  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      this.nav.setRoot(this.nav.getActive().component);
      resolve();
    });
  }
  reloadCallback = () => {
    return new Promise((resolve, reject) => {
      this.reloadOffers(5);
      resolve();
    });
  }

  reloadOffers(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.offersService.getOffers(0, 9999, null).subscribe(data => {
      this.offers = []
      if (data instanceof Array) {
        this.offers = data;
      }
    }, err => this.getOffers(--retry))
  }

  openMenu(e, o: Offer) {
    let prompt = this.alertCtrl.create({
      title: 'Xác nhận',
      message: "Xóa đề xuất trao đổi ?",
      buttons: [
        {
          text: 'Từ chối',
        },
        {
          text: 'Chấp nhận',
          handler: data => {
            // let loading = this.loadingCtrl.create({
            //   content: 'Please wait...',
            //   enableBackdropDismiss: true
            // });
            // loading.present();
            this.retryDetele(5, o);
          }
        }
      ]
    });
    prompt.present();
  }

  retryDetele(retry, o) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.offersService.delete(o.guid).subscribe(data => {
      // this.offers = []
      if (data.status) {
        this.offers = this.offers.filter(e => e.guid != o.guid);
        this.customService.toastMessage('Xóa trao đổi thành công', 'bottom', 2000);
        if (o.target != 'friends') {
          this.fbService.deleteOffer(o.guid)
        }
        // loading.dismiss();
      }
    }, err => this.retryDetele(--retry, o))
  }
}
