import { CustomService } from './../../../services/custom.service';
import { PaymentService } from './../../../services/payment.service';
import { PROVINCES } from './../../../provinces';
import { WARDS } from './../../../wards';
import { DISTRICTS } from './../../../districts';
import { Component, OnInit, Input } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { PaymentShipingMethodComponent } from '../payment-shiping-method/payment-shiping-method.component';
import { User } from '../../../api/models';

@Component({
  selector: 'app-payment-customer-info',
  templateUrl: './payment-customer-info.component.html'
})
export class PaymentCustomerInfoComponent implements OnInit {

  @Input('fullname') fullname: string;
  @Input('phone') phone: string;
  @Input('address') address: string;
  @Input('province') province: string;
  @Input('district') district: string;
  @Input('ward') ward: string;
  @Input('note') note: string;

  provinces: any;
  districts: any;
  wards: any;
  userCurrent: User;
  constructor(
    private customService: CustomService,
    private paymentService: PaymentService,
    public nav: NavController,
    public appCtrl: App) {
    this.provinces = PROVINCES;
    this.fullname = this.customService.user_current.fullname;
    this.phone = this.customService.user_current.mobilelogin;
    this.userCurrent = this.customService.user_current;
    this.setUpAddressUser();
  }

  ngOnInit() {
  }

  setUpAddressUser() {
    this.fullname = this.userCurrent.fullname;
    this.phone = this.userCurrent.mobilelogin;
    if (this.userCurrent.address && this.userCurrent.ward && this.userCurrent.district && this.userCurrent.province) {
      this.address = this.userCurrent.address;
      this.ward = WARDS.filter(e => e.wardid == this.userCurrent.ward)[0].wardid;
      this.district = DISTRICTS.filter(e => e.districtid == this.userCurrent.district)[0].districtid;
      this.province = PROVINCES.filter(e => e.provinceid == this.userCurrent.province)[0].provinceid;
      this.districts = DISTRICTS.filter(data => data.provinceid == this.province);
      this.wards = WARDS.filter(data => data.districtid == this.district);
    }
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
    if (!this.fullname || !this.phone || !this.address || !this.province || !this.district || !this.ward) {
      this.customService.toastMessage('Thông tin khách hàng chưa hợp lệ', 'bottom', 3000);
    } else {
      this.paymentService.param_create_order.fullname = this.fullname;
      this.paymentService.param_create_order.phone = this.phone;
      this.paymentService.param_create_order.address = this.address;
      this.paymentService.param_create_order.province = this.province;
      this.paymentService.param_create_order.district = this.district;
      this.paymentService.param_create_order.ward = this.ward;
      this.paymentService.param_create_order.note = this.note;
      this.appCtrl.getRootNav().push(PaymentShipingMethodComponent);
    }
  }

  dismiss() {
    this.nav.pop();
  }

}