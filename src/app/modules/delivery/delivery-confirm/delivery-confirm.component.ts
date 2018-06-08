import { CustomService } from './../../../services/custom.service';
import { InventoriesService } from './../../../services/inventories.service';
import { DISTRICTS } from './../../../districts';
import { WARDS } from './../../../wards';
import { PROVINCES } from './../../../provinces';
import { Component, OnInit } from '@angular/core';
import { Item, User } from '../../../api/models';
import { NavParams, NavController, LoadingController } from 'ionic-angular';

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
  payment_method: any;
  shipping_fee: number;
  note: string;
  full_address: string;
  userCurrent: User;
  payment_methods = [];
  constructor(private navParams: NavParams, private nav: NavController, private inventoryService: InventoriesService,
    private customService: CustomService, public loadingCtrl: LoadingController) {
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
    this.shipping_fee = this.navParams.get('shipping_fee');
    this.note = this.navParams.get('note');
    this.userCurrent = this.customService.user_current;

    this.full_address = this.address + " " + WARDS.find(data => data.wardid == this.ward_id).name + " " + DISTRICTS.find(data => data.districtid == this.district_id).name
      + " " + PROVINCES.find(data => data.provinceid == this.province_id).name;
  }

  ngOnInit() {
  }

  changePage() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();
    this.initDelevery(5, loading);
  }

  formatCurrency(amount: number) {
    return this.customService.formatCurrency("" + amount, this.userCurrent.usercurrency);
  }

  initDelevery(retry, loading) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.inventoryService.delevery(this.ward_id, 'confirm', this.phone, this.address, this.province_id, this.district_id, this.fullname,
      this.note, this.payment_method.filename, '0', this.item.guid + "",
      this.quantity, this.item.product_snapshot.shop.guid).subscribe(data => {
        if (data.status) {
          this.nav.popToRoot();
          loading.dismiss();
          this.customService.toastMessage('Giao hàng thành công.', 'bottom', 2000);
        } else {
          loading.dismiss();
          this.customService.toastMessage('Xác nhận thất bại. Vui lòng thử lại', 'bottom', 2000);
        }

      }, err => this.initDelevery(--retry, loading));
  }
}
