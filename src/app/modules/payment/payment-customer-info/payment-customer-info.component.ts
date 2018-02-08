import { CustomService } from './../../../services/custom.service';
import { PaymentService } from './../../../services/payment.service';
import { PROVINCES } from './../../../provinces';
import { WARDS } from './../../../wards';
import { DISTRICTS } from './../../../districts';
import { Component, OnInit, Input } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { PaymentShipingMethodComponent } from '../payment-shiping-method/payment-shiping-method.component';

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

  constructor(
    private customService: CustomService,
    private paymentService: PaymentService,
    public nav: NavController, 
    public appCtrl: App) {
    this.provinces = PROVINCES;
     }

  ngOnInit() {
  }

  onProvinceChange(provinceid: string) {
    this.districts = DISTRICTS.filter(data => data.provinceid == provinceid);
    this.wards = [];
  }

  onDistrictChange(districtid: string) {
    this.wards = WARDS.filter(data => data.districtid == districtid);
  }

  onWardChange(wardid: string) {
    
  }


  changePage() {
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
