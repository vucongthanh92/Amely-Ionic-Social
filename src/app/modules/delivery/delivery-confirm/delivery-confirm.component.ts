import { CustomService } from './../../../services/custom.service';
import { guid } from './../../../api/models/guid';
import { InventoriesService } from './../../../services/inventories.service';
import { DISTRICTS } from './../../../districts';
import { WARDS } from './../../../wards';
import { PROVINCES } from './../../../provinces';
import { Component, OnInit } from '@angular/core';
import { Item } from '../../../api/models';
import { NavParams, NavController } from 'ionic-angular';

@Component({
  selector: 'app-delivery-confirm',
  templateUrl: './delivery-confirm.component.html'
})
export class DeliveryConfirmComponent implements OnInit {
  item: Item;
  quantity: number;
  fullname: string;
  phone: string;
  address: string;
  ward_id: string;
  province_id: string;
  district_id: string;
  payment_method: string;
  payment_method_label: string;
  note: string;
  full_address: string;
  payment_methods = [];
  constructor(private navParams: NavParams, private nav: NavController, private inventoryService: InventoriesService, private customService: CustomService) {
    this.item = this.navParams.get('item');
    this.quantity = this.navParams.get('quantity');
    this.fullname = this.navParams.get('fullname');
    this.phone = this.navParams.get('phone');
    this.address = this.navParams.get('address');
    this.ward_id = this.navParams.get('ward');
    this.province_id = this.navParams.get('province');
    this.district_id = this.navParams.get('district');
    this.payment_method = this.navParams.get('payment_method');
    this.payment_methods = this.navParams.get('payment_methods');
    this.note = this.navParams.get('note');
    this.payment_method_label = this.payment_methods.find(e => e.filename == this.payment_method).displayname;
    this.full_address = this.address + " " + WARDS.find(data => data.wardid == this.ward_id).name + " " + DISTRICTS.find(data => data.districtid == this.district_id).name
      + " " + PROVINCES.find(data => data.provinceid == this.province_id).name;
  }

  ngOnInit() {
  }

  changePage() {
    this.inventoryService.delevery(this.ward_id, 'confirm', this.phone, this.address, this.province_id, this.district_id, this.fullname, this.note, this.payment_method, '0', this.item.guid + "",
      this.quantity, this.item.product_snapshot.shop.guid).subscribe(data => {
        if (data.status) {
          this.nav.popToRoot();

        } else {
          this.customService.toastMessage('Xác nhận thất bại. Vui lòng thử lại','bottom',2000);
        }

      })
  }
}
