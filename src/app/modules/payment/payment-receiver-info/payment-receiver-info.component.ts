import { CustomService } from './../../../services/custom.service';
import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit, Input } from '@angular/core';
import { App, NavController, LoadingController } from 'ionic-angular';
import { PaymentPaymentMethodComponent } from '../payment-payment-method/payment-payment-method.component';
import { PROVINCES } from './../../../provinces';
import { WARDS } from './../../../wards';
import { DISTRICTS } from './../../../districts';

@Component({
  selector: 'app-payment-receiver-info',
  templateUrl: './payment-receiver-info.component.html'
})
export class PaymentReceiverInfoComponent implements OnInit {

  @Input('shipping_fullname') shipping_fullname: string;
  @Input('shipping_phone') shipping_phone: string;
  @Input('shipping_address') shipping_address: string;
  @Input('shipping_province') shipping_province: string;
  @Input('shipping_district') shipping_district: string;
  @Input('shipping_ward') shipping_ward: string;
  @Input('shipping_note') shipping_note: string;

  provinces: any;
  districts: any;
  wards: any;
  is_show: boolean;
  constructor(
    private customService: CustomService,
    private paymentService: PaymentService,
    public nav: NavController,
    private loadingCtrl: LoadingController,
    public appCtrl: App) {
    this.provinces = PROVINCES;
    this.shipping_fullname = this.customService.user_current.fullname;
    this.shipping_phone = this.customService.user_current.mobilelogin;
    console.log(this.paymentService.param_create_order);
    this.is_show = this.paymentService.param_create_order.shipping_method != 'sq/storage';
  }

  ngOnInit() {
  }

  onProvinceChange(provinceid: string) {
    this.districts = DISTRICTS.filter(data => data.provinceid == provinceid);
    this.wards = false;
  }

  onDistrictChange(districtid: string) {
    this.wards = WARDS.filter(data => data.districtid == districtid);
  }

  onWardChange(wardid: string) {

  }

  changePage() {
    console.log(this.shipping_province);
    console.log(this.shipping_district);
    console.log(this.shipping_ward);

    if (this.is_show) {
      if (!this.shipping_fullname) {
        this.customService.toastMessage('Tên người nhận không được để trống', 'bottom', 3000);
      } else if (!this.shipping_phone) {
        this.customService.toastMessage('Vui lòng nhập số điện thoại người nhận', 'bottom', 3000);
      } else if (!this.shipping_address || !this.shipping_province || !this.shipping_district || !this.shipping_ward) {
        this.customService.toastMessage('Vui lòng nhập địa chỉ người nhận', 'bottom', 3000);
      } else {
        let loading = this.loadingCtrl.create({
          content: 'Please wait...',
          enableBackdropDismiss: true
        });
        if (this.paymentService.param_create_order.shipping_method == 'sq/express') {
          loading.present();
          this.retryGetShippingFee(5, loading);
        } else {
          this.appCtrl.getRootNav().push(PaymentPaymentMethodComponent);
        }
        this.paymentService.param_create_order.shipping_fullname = this.shipping_fullname;
        this.paymentService.param_create_order.shipping_phone = this.shipping_phone;
        this.paymentService.param_create_order.shipping_address = this.shipping_address;
        this.paymentService.param_create_order.shipping_province = this.shipping_province;
        this.paymentService.param_create_order.shipping_district = this.shipping_district;
        this.paymentService.param_create_order.shipping_ward = this.shipping_ward;
        this.paymentService.param_create_order.shipping_note = this.shipping_note;

      }
    } else {
      this.appCtrl.getRootNav().push(PaymentPaymentMethodComponent);
    }
  }

  retryGetShippingFee(retry, loading) {
    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.paymentService.getShippingFee('sq/express', this.shipping_fullname, this.shipping_phone, this.shipping_address, this.shipping_province, this.shipping_district,
      this.shipping_ward, this.shipping_note, null).subscribe(data => {
        loading.dismiss();
        console.log(data);
        
        this.paymentService.param_create_order.shipping_fee = data.fee + "";
        this.appCtrl.getRootNav().push(PaymentPaymentMethodComponent);
      }, err => this.retryGetShippingFee(--retry, loading))
  }
}
