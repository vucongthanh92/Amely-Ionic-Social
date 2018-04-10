import { QuickPayConfirmComponent } from './../quick-pay-confirm/quick-pay-confirm.component';
import { WARDS } from './../../../wards';
import { DISTRICTS } from './../../../districts';
import { PROVINCES } from './../../../provinces';
import { Component, OnInit, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

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
  constructor(private nav: NavController) {
    this.provinces = PROVINCES;
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
    this.nav.push(QuickPayConfirmComponent);
  }
}
