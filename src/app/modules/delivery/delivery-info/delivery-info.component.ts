import { PaymentMethodComponent } from './../../../components/payment-method/payment-method.component';
import { InventoriesService } from './../../../services/inventories.service';
import { DeliveryConfirmComponent } from './../delivery-confirm/delivery-confirm.component';
import { CustomService } from './../../../services/custom.service';
import { PROVINCES } from './../../../provinces';
import { WARDS } from './../../../wards';
import { DISTRICTS } from './../../../districts';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams, LoadingController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Item } from '../../../api/models';

@Component({
  selector: 'app-delivery-info',
  templateUrl: './delivery-info.component.html'
})
export class DeliveryInfoComponent implements OnInit {
  fullname: string;
  phone: string;
  address: string;
  province: any;
  district: any;
  ward: any;
  province_id: string;
  district_id: string;
  ward_id: string;
  note: string;
  provinces: any;
  districts: any;
  wards: any;
  payment_method: any;
  item: Item; quantity: number; payment_methods = [];
  constructor(private navParams: NavParams, private nav: NavController, private customService: CustomService, private inventoryService: InventoriesService,
    private loadingCtrl: LoadingController) {
    this.item = this.navParams.get('item');
    this.quantity = this.navParams.get('quantity');
    this.payment_methods = this.navParams.get('payment_methods');
    this.provinces = PROVINCES;
    this.fullname = this.customService.user_current.fullname;
    this.phone = this.customService.user_current.mobilelogin;
    this.initAddress();
    console.log(this.payment_methods);
    this.payment_method = this.payment_methods[0];
  }

  ngOnInit() {
  }

  initAddress() {
    if (this.customService.user_current.province && this.customService.user_current.district && this.customService.user_current.ward) {
      // this.province = PROVINCES.filter(e => e.provinceid == this.customService.user_current.province)[0];
      this.address = this.customService.user_current.address;
      this.province = this.customService.user_current.province;

      this.districts = DISTRICTS.filter(data => data.provinceid == this.province);
      this.district = this.customService.user_current.district;
      this.wards = WARDS.filter(data => data.districtid == this.district);
      this.ward = this.customService.user_current.ward;
      this.province_id = this.customService.user_current.province;
      this.ward_id = this.customService.user_current.ward;
      this.district_id = this.customService.user_current.district;
    }
  }
  onProvinceChange(provinceid: string) {
    this.districts = DISTRICTS.filter(data => data.provinceid == provinceid);
    this.wards = false;
    this.province_id = provinceid;
  }

  onDistrictChange(districtid: string) {
    this.wards = WARDS.filter(data => data.districtid == districtid);
    this.district_id = districtid;
  }

  onWardChange(wardid: string) {
    this.ward_id = wardid;
  }

  changePage() {
    if (!this.payment_method) {
      this.customService.toastMessage('Chưa chọn phương thức vận chuyển', 'bottom', 2000);
    } else if (!this.fullname) {
      this.customService.toastMessage('Tên người nhận không được để trống', 'bottom', 2000);
    } else if (!this.phone) {
      this.customService.toastMessage('Số điện thoại người nhận không được để trống', 'bottom', 2000);
    } else if (!this.district_id || !this.ward_id || !this.province_id || !this.address) {
      this.customService.toastMessage('Thông tin địa chỉ người nhận chưa hoàn tất', 'bottom', 2000);
    } else {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...',
        enableBackdropDismiss: true
      });
      loading.present();
      this.retryGetShippingFee(5, loading);
    }
  }

  retryGetShippingFee(retry: number, loading) {
    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000);
      return;
    }
    this.inventoryService.shippingFeeDelevery(this.item.product_snapshot.guid + "", this.payment_method.filename, this.address, this.province_id, this.district_id, this.ward_id)
      .subscribe(data => {
        loading.dismiss();
        console.log(data);
        this.inventoryService.deliverOption = {
          item: this.item, quantity: this.quantity, fullname: this.fullname, phone: this.phone,
          address: this.address, ward: this.ward_id, province: this.province_id, district: this.district_id, payment_method: this.payment_method, note: this.note,
          payment_methods: this.payment_methods, shipping_fee: data.shipping_fee
        };
        this.nav.push(PaymentMethodComponent, { paymentMethods: this.inventoryService.paymentMethods })

      }, err => this.retryGetShippingFee(--retry, loading))
  }
}
