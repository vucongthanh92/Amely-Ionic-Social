import { FirebaseService } from './../../../services/firebase.service';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { DISTRICTS } from './../../../districts';
import { WARDS } from './../../../wards';
import { CustomService } from './../../../services/custom.service';
import { Shop } from './../../../api/models/shop';
import { Product } from './../../../api/models/product';
import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../api/models';
import { PROVINCES } from '../../../provinces';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'app-quick-pay-confirm',
  templateUrl: './quick-pay-confirm.component.html'
})
export class QuickPayConfirmComponent implements OnInit {

  public payment_method: any;
  public products: Product[];
  public shop: Shop
  public shipping: any;
  public userCurrent: User;
  public shipping_methods: any;
  private user_current: User;
  private listener;
  private alert;
  constructor(private paymentService: PaymentService, private customService: CustomService, private nav: NavController,
    private fbService: FirebaseService, private alertCtrl: AlertController, private iab: InAppBrowser, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.payment_method = this.paymentService.quick_pay_send_data.paymentMethod;
    this.products = this.paymentService.quick_pay_send_data.products;
    this.shop = this.paymentService.quick_pay_send_data.shop;
    this.shipping = this.paymentService.quick_pay_send_data.shipping;
    this.userCurrent = this.customService.user_current;
    this.shipping_methods = this.paymentService.quick_pay_send_data.shipping_methods;
    this.user_current = this.customService.user_current;
    // console.log(this.user_current);
    // console.log(this.paymentService.quick_pay_send_data);
    // console.log(this.paymentService.payment_qr_data);
    // console.log(this.paymentService.quick_pay_send_data.paymentMethod.displayname);
    // console.log(this.paymentService.payment_qr_data.to_guid);
    // console.log(this.paymentService.quick_pay_send_data.shipping_methods);

    if (this.paymentService.quick_pay_send_data.shipping_methods && (this.shipping_methods.filename == 'sq/pickup' || this.shipping_methods.filename == 'sq/storage')) {
      this.paymentService.quick_pay_send_data.shipping = null;
    }
    if (this.paymentService.quick_pay_send_data.shipping_methods.filename != 'sq/express') this.paymentService.quick_pay_send_data.shipping.shipping_fee ="0";
  }

  getTotalPrice() {
    let total: number = 0;
    this.products.forEach(element => {
      if (!element.hasInventory || element.hasInventory != 2)
        total += this.customService.netPrice(element) * element.display_quantity;
    });
    return total;
  }

  formartTotalPrice() {
    return this.customService.formatCurrency(this.getTotalPrice() + "", this.userCurrent.usercurrency);
  }

  formartShippingFee() {
    return this.customService.formatCurrency(this.paymentService.quick_pay_send_data.shipping.shipping_fee, this.userCurrent.usercurrency);
  }

  getAddress() {
    const province: string = PROVINCES.filter(e => e.provinceid == this.shipping.shipping_province)[0].name;
    const ward: string = WARDS.filter(e => e.wardid == this.shipping.shipping_ward)[0].name;
    const district: string = DISTRICTS.filter(e => e.districtid == this.shipping.shipping_district)[0].name;
    return this.shipping.shipping_address + ", " + ward + ", " + district + ", " + province;
  }

  submitPayment() {
    let loading1 = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading1.present();
    if (this.paymentService.quick_pay_send_data.paymentMethod.filename == 'WOD' || this.paymentService.quick_pay_send_data.paymentMethod.filename == 'COD'
      || this.paymentService.quick_pay_send_data.paymentMethod.filename == 'COS') {
      this.retryQuickPay(5, loading1);
    } else {
      // payment by Onepay, Paypal
      if (this.paymentService.quick_pay_send_data.shipping) {
        this.retryOnePayPayPal(5, loading1);
      } else {
        this.retryWallet(5, loading1);
      }
    }
  }

  retryWallet(retry, loading1) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.paymentService.quickPay(this.user_current.fullname, this.user_current.fullname, this.user_current.address, this.user_current.province, this.user_current.district, this.user_current.ward, "",
      this.paymentService.quick_pay_send_data.paymentMethod.filename, "", this.user_current.mobilelogin, this.user_current.mobilelogin, this.user_current.address,
      this.user_current.province, this.user_current.district, this.user_current.ward, "", this.shipping_methods.filename, this.paymentService.quick_pay_send_data.shipping.shipping_fee,
      this.paymentService.payment_qr_data.to_guid).subscribe(data => {
        console.log(data);
        loading1.dismiss();
        const browser = this.iab.create(data.url, '_blank', { location: 'no', zoom: 'yes' });
        browser.on('loadstop').subscribe(e => {
          if (e.url.indexOf('https://amely.com/m/temp_order/') > -1) {
            setTimeout(() => {
              this.nav.popToRoot();
              console.log('loadstop');
              browser.close();
            }, 3000);
          }
        });
      }, err => this.retryWallet(--retry, loading1));
  }

  retryOnePayPayPal(retry, loading1) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.paymentService.quickPay(this.paymentService.quick_pay_send_data.shipping.shipping_fullname, this.user_current.fullname, this.user_current.address,
      this.user_current.province, this.user_current.district, this.user_current.ward, "", this.paymentService.quick_pay_send_data.paymentMethod.filename, "",
      this.user_current.mobilelogin, this.paymentService.quick_pay_send_data.shipping.shipping_phone, this.paymentService.quick_pay_send_data.shipping.shipping_address,
      this.paymentService.quick_pay_send_data.shipping.shipping_province, this.paymentService.quick_pay_send_data.shipping.shipping_district, this.paymentService.quick_pay_send_data.shipping.shipping_ward,
      "", this.shipping_methods.filename, this.paymentService.quick_pay_send_data.shipping.shipping_fee, this.paymentService.payment_qr_data.to_guid).subscribe(data => {
        loading1.dismiss();
        console.log(data);
        const browser = this.iab.create(data.url, '_blank', { location: 'no', zoom: 'yes' });
        browser.on('loadstop').subscribe(e => {
          if (e.url.indexOf('https://amely.com/m/temp_order/') > -1) {
            setTimeout(() => {
              this.nav.popToRoot();
              console.log('loadstop');
              browser.close();
            }, 3000);
          }
        });
      }, err => this.retryOnePayPayPal(--retry, loading1));
  }
  retryQuickPay(retry, loading1) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.paymentService.quickPay(this.user_current.fullname, this.user_current.fullname, this.user_current.address, this.user_current.province,
      this.user_current.district, this.user_current.ward, "", this.paymentService.quick_pay_send_data.paymentMethod.filename, "", this.user_current.mobilelogin,
      this.user_current.mobilelogin, this.user_current.address, this.user_current.province, this.user_current.district, this.user_current.ward, "",
      this.paymentService.quick_pay_send_data.paymentMethod.filename == "COS" ? this.paymentService.quick_pay_send_data.shipping_methods.filename : "", this.paymentService.quick_pay_send_data.shipping.shipping_fee,
      this.paymentService.payment_qr_data.to_guid).subscribe(data => {
        loading1.dismiss();
        console.log(data);
        if (data.status) {
          let loading = this.loadingCtrl.create({
            content: 'Please wait...'
          });

          loading.present();
          this.listener = this.fbService.getOrder(this.paymentService.quick_pay_send_data.shop.guid, this.paymentService.payment_qr_data.user.guid, this.paymentService.payment_qr_data.to_guid).query;
          this.listener.on("child_removed", snapshot => {
            // loading.dismiss();
            // console.log(this.paymentService.quick_pay_send_data.paymentMethod.filename);
            switch (this.paymentService.quick_pay_send_data.paymentMethod.filename) {
              case 'COS':
                this.createAlertConfirm("Sản phẩm đã được chuyển vào kho", loading);
                break;
              case 'COD':
                this.createAlertConfirm("Thanh toán thành công. Vui lòng nhận hàng", loading);
                break;
              case 'WOD':
                this.createAlertConfirm("Thanh toán bằng ví. Vui lòng nhận hàng", loading);
                break
            }
          });
        } else if (!data.status && this.paymentService.quick_pay_send_data.paymentMethod.filename == "WOD") {
          this.customService.toastMessage("Số tiền trong ví không đủ thực hiện thanh toán", "bottom", 3000);
        } else this.customService.toastMessage("Thanh toán thất bại vui lòng thử lại", "bottom", 3000);
      }, err => this.retryQuickPay(--retry, loading1));
  }


  createAlertConfirm(message, loading) {
    this.listener.off("child_removed", snapshot => { });
    if (!this.alert) {
      loading.dismiss();
      this.alert = this.alertCtrl.create({
        title: 'Thông báo',
        message: message,
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Xác nhận',
            handler: () => {
              this.nav.popToRoot();
            }
          }
        ]
      });
      this.alert.present();
    }

  }

}
