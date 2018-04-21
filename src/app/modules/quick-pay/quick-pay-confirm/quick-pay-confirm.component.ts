import { FirebaseService } from './../../../services/firebase.service';
import { MainMenuComponent } from './../../../layout/main-menu/main-menu.component';
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
    private fbService: FirebaseService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

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


    console.log(this.paymentService.payment_qr_data.to_guid);

    // this.fbService.getOrder(this.paymentService.payment_qr_data.to_guid).query.on("child_removed", snapshot => {
    //   console.log(this.paymentService.payment_qr_data.to_guid);
    //   console.log(snapshot);
    //   console.log(snapshot.val());
    //   switch (this.paymentService.quick_pay_send_data.paymentMethod.filename) {
    //     case 'COS':
    //       this.createAlertConfirm("Sản phẩm đã được chuyển vào kho");
    //       break;
    //     case 'COD':
    //       this.createAlertConfirm("Thanh toán thành công. Vui lòng nhận hàng");
    //       break;
    //     case 'WOD':
    //       this.createAlertConfirm("Thanh toán bằng ví. Vui lòng nhận hàng");
    //       break
    //   }
    // });
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

  getAddress() {
    const province: string = PROVINCES.filter(e => e.provinceid == this.shipping.shipping_province)[0].name;
    const ward: string = WARDS.filter(e => e.wardid == this.shipping.shipping_ward)[0].name;
    const district: string = DISTRICTS.filter(e => e.districtid == this.shipping.shipping_district)[0].name;
    return this.shipping.shipping_address + ", " + ward + ", " + district + ", " + province;
  }

  submitPayment() {

    if (this.paymentService.quick_pay_send_data.paymentMethod.filename == 'WOD' || this.paymentService.quick_pay_send_data.paymentMethod.filename == 'COD'
      || this.paymentService.quick_pay_send_data.paymentMethod.filename == 'COS') {

      this.paymentService.quickPay(this.user_current.fullname, this.user_current.fullname, this.user_current.address, this.user_current.province,
        this.user_current.district, this.user_current.ward, "", this.paymentService.quick_pay_send_data.paymentMethod.filename, "", this.user_current.mobilelogin,
        this.user_current.mobilelogin, this.user_current.address, this.user_current.province, this.user_current.district, this.user_current.ward, "",
        this.paymentService.quick_pay_send_data.paymentMethod.filename, "0", this.paymentService.payment_qr_data.to_guid).subscribe(data => {
          console.log(data);
        });

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();
      this.listener = this.fbService.getOrder(this.paymentService.payment_qr_data.to_guid).query;
      this.listener.on("child_removed", snapshot => {
        // loading.dismiss();
        console.log(this.paymentService.quick_pay_send_data.paymentMethod.filename);

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
    }

  }

  createAlertConfirm(message, loading) {
    this.listener.off("child_removed", snapshot => { });
    if (!this.alert) {
      loading.dismiss();
      this.alert = this.alertCtrl.create({
        title: 'Thông báo',
        message: message,
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
