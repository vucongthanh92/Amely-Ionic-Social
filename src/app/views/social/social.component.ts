import { FirebaseService } from './../../services/firebase.service';
import { PaymentService } from './../../services/payment.service';
import { SearchComponent } from './../../components/search/search.component';
import { MenuController, PopoverController, LoadingController } from 'ionic-angular';
import { Component, OnInit, Input } from '@angular/core';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { OffersComponent } from './offers/offers.component';
import { NearByComponent } from './near-by/near-by.component';
import { EventsComponent } from './events/events.component';
import { CustomService } from '../../services/custom.service';
import { App, NavController, NavParams } from 'ionic-angular';
import { SocialMenuComponent } from './social-menu/social-menu.component';
import { QuickPayListItemComponent } from '../../modules/quick-pay/quick-pay-list-item/quick-pay-list-item.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { UserUpdateComponent } from '../../components/user/user-update/user-update.component';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
})

export class SocialComponent implements OnInit {
  @Input('search') search_content: string;
  is_search_show: boolean;
  tab1Root = NewsFeedComponent;
  tab2Root = OffersComponent;
  tab3Root = NearByComponent;
  tab4Root = EventsComponent;
  tab5Root = NearByComponent;
  tab6Root = EventsComponent;

  constructor(
    public nav: NavController, 
    public appCtrl: App, 
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public customService: CustomService,
    private popoverCtrl: PopoverController,
    private paymentService: PaymentService,
    private barcodeScanner: BarcodeScanner,
    private loadingCtrl: LoadingController,
    private fbService: FirebaseService
  ) {
    
  }

  ngOnInit() {
  }

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(SocialMenuComponent);
    popover.present({
      ev: myEvent
    });
  }

  search() {
    this.is_search_show = !this.is_search_show;
    if (!this.is_search_show) {
      if (this.search_content != undefined && this.search_content.length >= 3) {
        // this.customService.goToPageSearch(this.search_content,this.nav);
        this.nav.push(SearchComponent, { param: this.search_content, service: this })
      } else {
        this.customService.toastMessage('Tìm kiếm phải lớn hơn 3 ký tự', 'bottom', 3000)
      }
    }
  }

  payment() {
    // 632-4744
    // let code = "ekRDcHlSbXJ0cGp3SU4yRWEzVkpibTh3dnhHYXN4RnJsOVBKcGVpeS9rcz0";
    // this.paymentService.getTempOrder(code).subscribe(data => {
    //   // check update profile        
    //   this.paymentService.payment_qr_data = data;
    //   this.paymentService.getPaymentMethod().subscribe(data => {
    //     this.paymentService.payment_order_post = data;
    //     console.log(data);

    //     this.appCtrl.getRootNav().push(QuickPayListItemComponent)
    //   });

    // })
    this.barcodeScanner.scan().then((barcodeData) => {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();
      this.retryGetTempOrder(5, barcodeData, loading)
    }, (err) => {
      this.customService.toastMessage("Mã QR không hợp lệ hoặc đã hết hạn", 'bottom', 4000);
    });
  }

  retryGetTempOrder(retry, barcodeData, loading) {
    if (retry == 0) {
      loading.dismiss();
      return;
    }
    this.paymentService.getTempOrder(barcodeData.text).subscribe(data => {
      // check update profile        
      if (!this.customService.user_current.address || !this.customService.user_current.province || !this.customService.user_current.district || !this.customService.user_current.ward) {
        this.requestUpdateProfile()
        loading.dismiss();
      } else {
        this.paymentService.payment_qr_data = data;
        this.retryGetPaymentMethod(5, loading, barcodeData);
      }
    }, err => this.retryGetTempOrder(--retry, barcodeData, loading))
  }

  retryGetPaymentMethod(retry, loading, barcodeData) {
    if (retry == 0) {
      return;
    }
    this.paymentService.getPaymentMethod().subscribe(data => {
      this.paymentService.payment_order_post = data;
      loading.dismiss();
      this.appCtrl.getRootNav().push(QuickPayListItemComponent)
      this.fbService.deleteQRCode(barcodeData.text)
    }, err => this.retryGetPaymentMethod(--retry, loading, barcodeData));
  }

  requestUpdateProfile() {
    let myCallbackFunction = (_params) => {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
    this.appCtrl.getRootNav().push(UserUpdateComponent, { callback: myCallbackFunction, showError: true });
  }
}
