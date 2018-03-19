import { PROVINCES } from './../../../provinces';
import { DISTRICTS } from './../../../districts';
import { WARDS } from './../../../wards';
import { Delivery_order } from './../../../api/models/delivery-_order';
import { NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-history-delivery-detail',
  templateUrl: './history-delivery-detail.component.html'
})
export class HistoryDeliveryDetailComponent implements OnInit {
  do: Delivery_order;
  address: string;
  constructor(private navParams: NavParams) {
    this.do = this.navParams.get('do');
    this.address = this.do.shipping_address + " " + WARDS.find(e => e.wardid == this.do.shipping_ward).name + " " + DISTRICTS.find(e => e.districtid == this.do.shipping_district). name +
      " " + PROVINCES.find(e => e.provinceid == this.do.shipping_province).name;
  }

  ngOnInit() {
  }

}
