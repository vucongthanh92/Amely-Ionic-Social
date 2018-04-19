import { ProductComponent } from './../product/product.component';
import { Product } from './../../api/models/product';
import { UserComponent } from './../user/user.component';
import { CustomService } from './../../services/custom.service';
import { Offer } from './../../api/models/offer';
import { ModalCounterOfferComponent } from './modal-counter-offer/modal-counter-offer.component';
import { OffersService } from './../../services/offers.service';
import { NavParams, ModalController, ItemSliding, AlertController, NavController, LoadingController, App } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { CounterOffer } from '../../api/models/counter-offer';

@Component({
  selector: 'app-counters-offer',
  templateUrl: './counters-offer.component.html'
})
export class CountersOfferComponent implements OnInit {

  counters: CounterOffer[];
  offer: Offer
  guidOwner: number;
  guidProduct: number;

  constructor(
    private nav: NavController,
    private customService: CustomService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private offersService: OffersService,
    private navParams: NavParams,
    public loadingCtrl: LoadingController,
    public appCtrl: App
  ) {
    this.offer = this.navParams.get('param');
    this.loadData(5);
  }

  loadData(retry) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();

    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.offersService.getOffer(this.offer.guid).subscribe(
      data => {
        loading.dismiss();
        this.counters = data.counter_offers;
      },
      err => {
        this.loadData(--retry)
      });
  }
  ngOnInit() {
  }

  openHintModal() {
    this.openModal(ModalCounterOfferComponent);
  }

  openModal(pageName) {
    this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal' })
      .present();
  }

  archive(item: ItemSliding) {
    console.log('dasda');
  }

  detail(counter) {
    console.log(counter);
  }

  reject(counter) {
    let username = counter.owner.username;
    let message = "Bạn từ chối trao đổi với " + username + " ? ";
    this.doConfirm(message, 0, counter.guid);
  }

  agree(counter) {
    let username = counter.owner.username;
    let message = "Bạn chấp nhận trao đổi với " + username + " ? ";
    this.doConfirm(message, 1, counter.guid);
  }

  doConfirm(message, key, counter_guid) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    const alert = this.alertCtrl.create({
      title: 'Xác nhận trao đổi',
      message: message,
      buttons: [
        {
          text: 'Hủy',
          handler: () => {
          }
        },
        {
          text: 'Đồng ý',
          handler: () => {
            let callback = this.navParams.get("callback");


            switch (key) {
              case 0:
                this.offersService.rejectCounter(counter_guid).subscribe(data => {
                  if (data.status) {
                    this.customService.toastMessage("Bạn đã xóa trao đổi !", "bottom", 5000);
                    callback("callback").then(() => {
                      this.nav.pop();
                    });
                    loading.dismiss();
                  }
                });
                break;
              case 1:
                this.offersService.agreeCounter(this.offer.guid, counter_guid).subscribe(data => {
                  if (data.status) {
                    this.customService.toastMessage("Bạn đã trao đổi thành công !", "bottom", 5000);
                    callback("callback").then(() => {
                      this.nav.pop();
                    });
                    loading.dismiss();
                  }
                });
                break;
              default:
                break;
            }
          }
        }
      ]
    });

    alert.present();
  }

  openOwner(guidOwner, username) {
    this.appCtrl.getRootNav().push(UserComponent, { userGuid: guidOwner, username: username })
  }

  openProduct(guidProduct) {
    this.appCtrl.getRootNav().push(ProductComponent, { guid: guidProduct });
  }
}
