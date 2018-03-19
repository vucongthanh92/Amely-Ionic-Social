import { CustomService } from './../../../services/custom.service';
import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit, Input } from '@angular/core';
import { App, NavController } from 'ionic-angular';
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
    if (this.is_show) {
      if (!this.shipping_fullname) {
        this.customService.toastMessage('Tên người nhận không được để trống', 'bottom', 3000);
      } else if (!this.shipping_phone) {
        this.customService.toastMessage('Vui lòng nhập số điện thoại người nhận', 'bottom', 3000);
      } else if (!this.shipping_address || !this.shipping_province || !this.shipping_district || !this.shipping_ward) {
        this.customService.toastMessage('Vui lòng nhập địa chỉ người nhận', 'bottom', 3000);
      } else {
        this.paymentService.param_create_order.shipping_fullname = this.shipping_fullname;
        this.paymentService.param_create_order.shipping_phone = this.shipping_phone;
        this.paymentService.param_create_order.shipping_address = this.shipping_address;
        this.paymentService.param_create_order.shipping_province = this.shipping_province;
        this.paymentService.param_create_order.shipping_district = this.shipping_district;
        this.paymentService.param_create_order.shipping_ward = this.shipping_ward;
        this.paymentService.param_create_order.shipping_note = this.shipping_note;
        this.appCtrl.getRootNav().push(PaymentPaymentMethodComponent);
      }
    } else {
      this.appCtrl.getRootNav().push(PaymentPaymentMethodComponent);
    }



  }
}
