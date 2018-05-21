import { SearchComponent } from './../../components/search/search.component';
import { CustomService } from './../../services/custom.service';
import { CartItemsComponent } from './../../modules/cart/cart-items/cart-items.component';
import { Component, OnInit, Input } from '@angular/core';
import { ShopsComponent } from './shops/shops.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { ShopsFriendlyComponent } from './shops-friendly/shops-friendly.component';
import { App, NavController, NavParams, PopoverController, LoadingController } from 'ionic-angular';
import { ShoppingMenuComponent } from './shopping-menu/shopping-menu.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { PaymentService } from '../../services/payment.service';
import { UserUpdateComponent } from '../../components/user/user-update/user-update.component';
import { QuickPayListItemComponent } from '../../modules/quick-pay/quick-pay-list-item/quick-pay-list-item.component';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html'
})
export class ShoppingComponent implements OnInit {
  @Input('search') search_content: string;
  is_search_show: boolean;
  check_screen: string;
  tab1Root = ShopsComponent;
  tab2Root = VouchersComponent;
  tab3Root = ShopsFriendlyComponent;

  constructor(
    public nav: NavController,
    public appCtrl: App,
    public navParams: NavParams,
    public customService: CustomService,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public paymentService: PaymentService,
    private barcodeScanner: BarcodeScanner) {
    var ratio = window.devicePixelRatio || 1;
    var screen = {
      width: window.screen.width * ratio,
      height: window.screen.height * ratio
    };
    if (screen.width == 1125 && screen.height == 2436) {
      this.check_screen = "top_navigation_iphonex";
    }
    else if (screen.width == 1080 && screen.height == 1920) {
      this.check_screen = "top_navigation_iphone7plus";
    }
    else {
      this.check_screen = "top_navigation_iphone6s";
    }
  }

  ngOnInit() {
  }

  changePage() {
    this.appCtrl.getRootNav().push(CartItemsComponent);
  }
  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(ShoppingMenuComponent);
    popover.present({
      ev: myEvent
    });
  }
  search() {
    this.is_search_show = !this.is_search_show;
    if (!this.is_search_show) {
      if (this.search_content != undefined && this.search_content.length >= 3) {
        // this.customService.goToPageSearch(this.search_content, this.nav);
        this.nav.push(SearchComponent, { param: this.search_content, service: this })
      } else {
        this.customService.toastMessage('Tìm kiếm phải lớn hơn 3 ký tự', 'bottom', 3000)
      }
    }
  }

  retryGetTempOrder(retry, barcodeData, loading) {
    if (retry == 0) {
      return;
    }
    this.paymentService.getTempOrder(barcodeData.text).subscribe(data => {
      // check update profile        
      if (!this.customService.user_current.address || !this.customService.user_current.province || !this.customService.user_current.district || !this.customService.user_current.ward) {
        this.requestUpdateProfile()
        loading.dismiss();
      } else {
        this.paymentService.payment_qr_data = data;
        this.retryGetPaymentMethod(5, loading);
      }
    }, err => this.retryGetTempOrder(--retry, barcodeData, loading));
  }

  retryGetPaymentMethod(retry, loading) {
    if (retry == 0) return;
    this.paymentService.getPaymentMethod().subscribe(data => {
      this.paymentService.payment_order_post = data;
      loading.dismiss();
      this.appCtrl.getRootNav().push(QuickPayListItemComponent)
    }, err => this.retryGetPaymentMethod(--retry, loading));
  }

  payment() {
    const test ="Ui8wcnN5YmNCQmErelNUU2NEa1YrN3pWS0E5eC9iYUNiVy9XRjBlR1J2bz0";
    this.barcodeScanner.scan().then((barcodeData) => {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...',
        enableBackdropDismiss: true
      });
      if (!barcodeData.cancelled) {
        loading.present();
        this.retryGetTempOrder(5, barcodeData, loading);
      }
    }, (err) => {
      this.customService.toastMessage("Mã QR không hợp lệ hoặc đã hết hạn", 'bottom', 4000);
    });

    // this.paymentService.getTempOrder(test).subscribe(data => {
    //   // check update profile        
    //   if (!this.customService.user_current.address || !this.customService.user_current.province || !this.customService.user_current.district || !this.customService.user_current.ward) {
    //     this.requestUpdateProfile()
    //   } else {
    //     this.paymentService.payment_qr_data = data;
    //     this.paymentService.getPaymentMethod().subscribe(data => {
    //       this.paymentService.payment_order_post = data;
    //       this.appCtrl.getRootNav().push(QuickPayListItemComponent)
    //     });
    //   }
    // })
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
