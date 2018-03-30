import { filter } from 'rxjs/operators/filter';
import { CustomService } from './../../../../services/custom.service';
import { OffersItemDetailComponent } from './../offers-item-detail/offers-item-detail.component';
import { OffersService } from './../../../../services/offers.service';
import { Component, OnInit } from '@angular/core';
import { CounterOffer } from '../../../../api/models/counter-offer';
import { App, AlertController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'app-offers-pending',
  templateUrl: './offers-pending.component.html'
})
export class OffersPendingComponent implements OnInit {
  counterOffers: Array<CounterOffer> = [];
  constructor(private offerService: OffersService, private app: App, private customService: CustomService, private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadData(5);
  }

  loadData(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.offerService.getCounterOffers(0, 9999).subscribe(data => {
      if (data instanceof Array) {
        this.counterOffers = data;
      }
    }, err => this.loadData(--retry));
  }

  getTimeString(time: number) {
    return new Date(time * 1000);
  }

  detail(counterOffer) {
    this.app.getRootNav().push(OffersItemDetailComponent, {
      callback: this.myCallbackFunction,
      cOffer: counterOffer
    });
  }


  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  openMenu(e, counterOffer: CounterOffer) {
    let prompt = this.alertCtrl.create({
      title: 'Xác nhận',
      message: "Xóa đề xuất trao đổi ?",
      buttons: [
        {
          text: 'Từ chối',
        },
        {
          text: 'Chấp nhập',
          handler: data => {
            let loading = this.loadingCtrl.create({
              content: 'Please wait...',
              enableBackdropDismiss: true
            });

            loading.present();
            this.offerService.deleteCounterOffer(counterOffer.guid).subscribe(data => {
              loading.dismiss();
              if (data.status) {
                this.counterOffers = this.counterOffers.filter(e => e.guid != counterOffer.guid);
              } else this.customService.toastMessage('Thất bại. Vui lòng thử lại', 'bottom', 3000);
            })
          }
        }
      ]
    });
    prompt.present();
  }
}
