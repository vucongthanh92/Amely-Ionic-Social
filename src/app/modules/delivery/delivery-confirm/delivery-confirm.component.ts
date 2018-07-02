import { InAppBrowser } from '@ionic-native/in-app-browser';
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
  payment_selected: string;
  userCurrent: User;
  payment_methods = [];
  constructor(private navParams: NavParams, private nav: NavController, private inventoryService: InventoriesService,
    private customService: CustomService, public loadingCtrl: LoadingController, private iab: InAppBrowser) {
    // this.item = this.navParams.get('item');
    // this.quantity = this.navParams.get('quantity');
    // this.fullname = this.navParams.get('fullname');
    // this.phone = this.navParams.get('phone');
    // this.address = this.navParams.get('address');
    // this.ward_id = this.navParams.get('ward');
    // this.province_id = this.navParams.get('province');
    // this.district_id = this.navParams.get('district');
    // this.payment_method = this.navParams.get('payment_method');
    // this.payment_methods = this.navParams.get('payment_methods');
    // this.shipping_fee = this.navParams.get('shipping_fee');
    // this.note = this.navParams.get('note');
    this.item = this.inventoryService.deliverOption.item;
    this.quantity = this.inventoryService.deliverOption.quantity;
    this.fullname = this.inventoryService.deliverOption.fullname;
    this.phone = this.inventoryService.deliverOption.phone;
    this.address = this.inventoryService.deliverOption.address;
    this.ward_id = this.inventoryService.deliverOption.ward;
    this.province_id = this.inventoryService.deliverOption.province;
    this.district_id = this.inventoryService.deliverOption.district;
    this.payment_method = this.inventoryService.deliverOption.item;
    this.payment_methods = this.inventoryService.deliverOption.payment_methods;
    this.shipping_fee = +this.inventoryService.deliverOption.shipping_fee;
    this.note = this.inventoryService.deliverOption.note;
    this.userCurrent = this.customService.user_current;
    this.payment_selected = this.navParams.get("payment_selected");
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
      loading.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    //todo remake delevery 
    this.inventoryService.delevery(this.ward_id, 'confirm', this.phone, this.address, this.province_id, this.district_id, this.fullname,
      this.note, this.payment_method.filename, this.shipping_fee + "", this.item.guid + "",
      this.quantity, this.item.product_snapshot.shop.guid, this.payment_selected).subscribe(data => {
        loading.dismiss();
        this.openBrowser(data.url)
        // if (data.status) {
        //   this.nav.popToRoot();
        //   this.customService.toastMessage('Giao hàng thành công.', 'bottom', 2000);
        // } else {
        //   this.customService.toastMessage('Xác nhận thất bại. Vui lòng thử lại', 'bottom', 2000);
        // }

      }, err => {
        console.log(err);
        this.initDelevery(--retry, loading)
      });
  }

  openBrowser(url) {
    const browser = this.iab.create(url, '_blank', { location: 'no', zoom: 'yes' });
    browser.on('loadstop').subscribe(e => {
      if (e.url.indexOf('https://amely.com/m/temp_order/') > -1) {
        setTimeout(() => {
          this.nav.popToRoot();
          browser.close();
        }, 3000);
      }

    });
    browser.on('exit').subscribe(data => {
      this.nav.popToRoot();
    });

    browser.on('loadstart').subscribe(e => {

    });
  }
}
