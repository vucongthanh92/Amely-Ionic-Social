import { OfferService } from './../../../../services/offer.service';
import { CounterOffer } from './../../../../api/models/counter-offer';
import { CountersOfferComponent } from './../../../../components/counters-offer/counters-offer.component';
import { CustomService } from './../../../../services/custom.service';
import { NavParams, NavController, App, Navbar, LoadingController } from 'ionic-angular';
import { Offer } from './../../../../api/models/offer';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OffersService } from '../../../../services/offers.service';
import { CreateOfferComponent } from '../../../../components/create-offer/create-offer.component';

@Component({
  selector: 'app-offers-item-detail',
  templateUrl: './offers-item-detail.component.html'
})
export class OffersItemDetailComponent implements OnInit {

  offer: Offer;
  product_image: any;
  is_counter = false;
  counter: Offer;
  cOffer: CounterOffer;
  @ViewChild('navbar') navBar: Navbar;

  constructor(
    private customService: CustomService,
    private offersService: OffersService,
    private offerService: OfferService,
    private navParams: NavParams,
    private nav: NavController,
    public loadingCtrl: LoadingController,
    private app: App
  ) {

  }

  ionViewDidEnter() {
    this.cOffer = this.navParams.get('cOffer');
    if (this.cOffer) {
      this.getOffer(5);
    } else {
      this.offer = this.navParams.get('param');
      this.setupData();
    }
  }

  getOffer(retry) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();

    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      this.nav.pop();
      return;
    }
    this.offersService.getOffer(this.cOffer.offer.guid).subscribe(data => {
      loading.dismiss();
      this.offer = data;
      this.setupData();
    }, err => this.getOffer(--retry))
  }

  setupData() {
    if (typeof this.offer.owner == "undefined") {
      this.offer.owner = this.customService.user_current;
      this.is_counter = true;
    }
    if (typeof this.offer.counter_offers != "undefined") {
      let arr = this.offer.counter_offers.filter(data => data.owner.username == this.customService.user_current.username);
      if (arr.length > 0) {
        this.counter = arr[0];
      }
      this.is_counter = this.offer.counter_offers.some(data => data.owner.username == this.customService.user_current.username);
    }

    this.offer.seconds = 0;
    // console.log(this.offer);
    // this.product_image = this.offer.product_snapshot.images[0];
    this.retryGetCurrentTime(5);
  }

  retryGetCurrentTime(retry) {
    if (retry == 0) return;
    this.customService.getCurrentTime().subscribe(data => {
      this.offer.seconds = this.offer.time_end - data.current_time;
    }, err => this.retryGetCurrentTime(--retry));
  }

  ngOnInit() {
  }

  changePage(offer) {
    // this.app.getRootNav().push(CountersOfferComponent, { param: offer });

    // let callback = this.params.get("callback");

    // callback(item.item).then(() => {
    //   this.nav.pop();
    // });

    this.app.getRootNav().push(CountersOfferComponent, {
      callback: this.myCallbackFunction,
      param: offer
    });
  }

  requestOffer(offer: Offer) {
    this.retryRequestOffer(5, offer);
  }

  retryRequestOffer(retry, offer) {
    if (retry == 0) return;
    this.offerService.createCounterOffer({ offer_guid: offer.guid, item_guid: null, quantity: 0, note: 'string' }).subscribe(data => {
      if (data.status) {
        let callback = this.navParams.get("callback");
        callback("test").then(() => {
          this.nav.pop();
        });
      } else {
        this.customService.toastMessage('Bạn đã đề nghị nhận quà cho trao đổi này.', 'bottom', 2000);
      }
    }, err => this.retryRequestOffer(--retry, offer));
  }

  chosenItem(offer) {
    this.app.getRootNav().push(CreateOfferComponent, {
      callback: this.myCreateOfferFunction,
      counter: true,
      param: offer
    });
  }

  myCreateOfferFunction = (_params) => {
    return new Promise((resolve, reject) => {
      let callback = this.navParams.get("callback");
      console.log(_params);
      if (_params == 'back') {
        this.nav.pop()
      }
      if (_params == 'test') {
        callback("test").then(() => {
          this.nav.setRoot(this.nav.getActive().component);
        });
      }
      resolve();
    });
  }

  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      let callback = this.navParams.get("callback");
      callback("test").then(() => {
        this.nav.pop();
      });
      resolve();
    });
  }

}
