import { PaymentService } from './../../../services/payment.service';
import { CustomService } from './../../../services/custom.service';
import { QuickPayConfirmComponent } from './../quick-pay-confirm/quick-pay-confirm.component';
import { WARDS } from './../../../wards';
import { DISTRICTS } from './../../../districts';
import { PROVINCES } from './../../../provinces';
import { Component, OnInit, Input } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'app-quick-pay-shipping-option',
  templateUrl: './quick-pay-shipping-option.component.html'
})
export class QuickPayShippingOptionComponent implements OnInit {

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
  constructor(private nav: NavController, private customService: CustomService, private paymentService: PaymentService, private loadingCtrl: LoadingController) {
    this.provinces = PROVINCES;
  }

  ngOnInit() {
    this.shipping_fullname = this.customService.user_current.fullname;
    this.shipping_phone = this.customService.user_current.mobilelogin;
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
    if (!this.shipping_fullname) {
      this.customService.toastMessage('Chưa nhập tên người nhận', 'bottom', 3000);
    } else if (!this.shipping_phone) {
      this.customService.toastMessage('Chưa nhập số điện thoại người nhận', 'bottom', 3000);
    } else if (!this.shipping_address) {
      this.customService.toastMessage('Chưa nhập địa chỉ người nhận', 'bottom', 3000);
    } else if (!this.shipping_province) {
      this.customService.toastMessage('Chưa chọn tỉnh thành', 'bottom', 3000);
    } else if (!this.shipping_district) {
      this.customService.toastMessage('Chưa chọn quận huyện', 'bottom', 3000);
    } else if (!this.shipping_ward) {
      this.customService.toastMessage('Chưa chọn phường xã', 'bottom', 3000);
    } else {
      if (this.paymentService.quick_pay_send_data.shipping_methods.filename == 'sq/express') {
        let loading = this.loadingCtrl.create({
          content: 'Please wait...',
          enableBackdropDismiss: true
        });

        loading.present();
        this.retryShippingFee(5, loading);
      } else {
        this.nav.push(QuickPayConfirmComponent);
      }
      this.paymentService.quick_pay_send_data.shipping = {};
      this.paymentService.quick_pay_send_data.shipping.shipping_fullname = this.shipping_fullname;
      this.paymentService.quick_pay_send_data.shipping.shipping_phone = this.shipping_phone;
      this.paymentService.quick_pay_send_data.shipping.shipping_address = this.shipping_address;
      this.paymentService.quick_pay_send_data.shipping.shipping_province = this.shipping_province;
      this.paymentService.quick_pay_send_data.shipping.shipping_district = this.shipping_district;
      this.paymentService.quick_pay_send_data.shipping.shipping_ward = this.shipping_ward;

    }
  }

  retryShippingFee(retry, loading) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.paymentService.getShippingFee('sq/express', this.shipping_fullname, this.shipping_phone, this.shipping_address, this.shipping_province,
      this.shipping_district, this.shipping_ward, this.shipping_note, this.paymentService.payment_qr_data.to_guid).subscribe(data => {
        console.log(data);
        loading.dismiss();
        this.paymentService.quick_pay_send_data.shipping.shipping_fee = data.fee;
        this.nav.push(QuickPayConfirmComponent);
      }, err => this.retryShippingFee(--retry, loading));
  }
}
