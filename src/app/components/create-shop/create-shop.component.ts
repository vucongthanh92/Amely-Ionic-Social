import { ShopsService } from './../../services/shops.service';
import { NavParams, App, LoadingController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Shop } from '../../api/models';
import { CustomService } from '../../services/custom.service';
import { PROVINCES } from '../../provinces';
import { DISTRICTS } from '../../districts';
import { WARDS } from '../../wards';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html'
})
export class CreateShopComponent implements OnInit {
  public shop: Shop;
  public name: string;
  public phone: string;
  public address: string;
  public BIDN: string;
  public price: string;
  public friend_url: string;
  public owner_name: string;
  public owner_phone_number: string;
  public owner_address: string;
  public shipping_method: string = 'Self';
  public ssn: string;
  public provinces: any;
  public districts: any;
  public wards: any;
  public province: any;
  public district: any;
  public ward: any;
  public owner_provinces: any;
  public owner_districts: any;
  public owner_wards: any;
  public owner_province: any;
  public owner_district: any;
  public owner_ward: any;
  public rules: boolean = false;
  public relesDisabled: boolean = false;

  constructor(
    private navParams: NavParams,
    private appCtrl: App,
    private customService: CustomService,
    private shopService: ShopsService,
    public loadingCtrl: LoadingController,
    public nav: NavController
  ) {

    this.shop = this.navParams.get('shop');
    console.log(this.shop);

    if (this.shop.guid != null) {
      this.name = this.shop.title;
      this.phone = this.shop.shop_phone;
      this.address = this.shop.shop_address;
      this.BIDN = this.shop.shop_bidn;
      this.price = this.shop.adjourn_price + '';
      this.friend_url = this.shop.friendly_url;
      this.owner_phone_number = this.shop.owner_phone;
      this.owner_address = this.shop.owner_address;
      this.shipping_method = this.shop.shipping_method;
      this.ssn = this.shop.owner_ssn + '';
      this.province = this.shop.shop_province;
      this.district = this.shop.shop_district;
      this.ward = this.shop.shop_ward;
      this.owner_district = this.shop.owner_district;
      this.owner_province = this.shop.owner_province;
      this.owner_ward = this.shop.owner_ward;
      if (this.shop.status == '1' || this.shop.status == '2' || this.shop.status == '3' || this.shop.status == '4' || this.shop.status == '5') {
        this.rules = true;
        this.relesDisabled = true;

      }
      this.districts = DISTRICTS.filter(data => data.provinceid == this.province);
      this.wards = WARDS.filter(data => data.districtid == this.district);
      this.owner_districts = DISTRICTS.filter(data => data.provinceid == this.owner_province);
      this.owner_wards = WARDS.filter(data => data.districtid == this.owner_district);
    }
    this.provinces = PROVINCES;
    this.owner_provinces = PROVINCES;
    this.owner_name = this.customService.user_current.fullname;
    this.owner_phone_number = this.customService.user_current.mobilelogin;
  }
  // define('SHOP_REQUESTING', 0);
  // define('SHOP_PENDING', 1);
  // define('SHOP_REJECTED', 2);
  // define('SHOP_APPROVED', 3);
  // define('SHOP_SUSPENDED', 4);
  // define('SHOP_UNPUBLISHED', 5);
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
  onOwnerProvinceChange(provinceid: string) {
    this.owner_districts = DISTRICTS.filter(data => data.provinceid == provinceid);
    this.owner_wards = false;
  }

  onOwnerDistrictChange(districtid: string) {
    this.owner_wards = WARDS.filter(data => data.districtid == districtid);
  }

  onOwnerWardChange(wardid: string) {

  }


  createShop() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();
    if (!this.name) {
      loading.dismiss();
      this.customService.toastMessage('Tên cửa hàng không được để trống', 'bottom', 2000);
    } else if (!this.phone) {
      loading.dismiss();
      this.customService.toastMessage('Số điện thoại cửa hàng không được để trống', 'bottom', 2000);
    } else if (!this.address) {
      loading.dismiss();
      this.customService.toastMessage('Địa chỉ cửa hàng không được để trống', 'bottom', 2000);
    } else if (!this.BIDN) {
      loading.dismiss();
      this.customService.toastMessage('Mã doanh nghiệp không được để trống', 'bottom', 2000);
    } else if (!this.friend_url) {
      loading.dismiss();
      this.customService.toastMessage('Friend url không được để trống', 'bottom', 2000);
    } else if (!this.owner_name) {
      loading.dismiss();
      this.customService.toastMessage('Tên chủ cửa hàng không được để trống', 'bottom', 2000);
    } else if (!this.owner_phone_number) {
      loading.dismiss();
      this.customService.toastMessage('Số điện thoại chủ cửa hàng không được để trống', 'bottom', 2000);
    } else if (!this.owner_address) {
      loading.dismiss();
      this.customService.toastMessage('Địa chỉ chủ cửa hàng không được để trống', 'bottom', 2000);
    } else if (!this.shipping_method) {
      loading.dismiss();
      this.customService.toastMessage('Chưa chọn phương thức vận chuyển', 'bottom', 2000);
    } else if (!this.ssn) {
      loading.dismiss();
      this.customService.toastMessage('SSN không được để trống', 'bottom', 2000);
    } else if (!this.province && !this.district && !this.ward) {
      loading.dismiss();
      this.customService.toastMessage('Chưa chọn địa chỉ cửa hàng', 'bottom', 2000);
    } else if (!this.owner_province && !this.owner_district && !this.owner_ward) {
      loading.dismiss();
      this.customService.toastMessage('Chưa chọn địa chỉ chủ cửa hàng', 'bottom', 2000);
    } else if (this.rules == false) {
      loading.dismiss();
      this.customService.toastMessage('Bạn chưa đồng ý điều khoản của Amely !', 'bottom', 2000);
    } else {
      this.retryCreateShop(5, loading)
    }
  }
  retryCreateShop(retry, loading) {
    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.shopService.createShop(this.shipping_method, this.name, this.address, this.BIDN, this.price, this.friend_url, this.phone, this.owner_name,
      this.owner_phone_number, this.owner_address, this.ssn, null,
      this.province, this.district, this.ward, this.owner_province, this.owner_district, this.owner_ward).subscribe(
        data => {
          if (data.status) {
            this.appCtrl.getRootNav().pop();
            this.customService.toastMessage('Đăng ký thành công, đang chờ được duyệt !', 'bottom', 3000)
          } else {
            this.customService.toastMessage('Đăng ký thất bại , vui lòng thử lại .', 'bottom', 3000)
          }
          loading.dismiss();
        },
        err => { this.retryCreateShop(--retry, loading) })
  }

  dismiss() {
    this.nav.pop();
  }

  onChange($event) {
  }

  updateShop() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();
    if (!this.name) {
      loading.dismiss();
      this.customService.toastMessage('Tên cửa hàng không được để trống', 'bottom', 2000);
    } else if (!this.phone) {
      loading.dismiss();
      this.customService.toastMessage('Số điện thoại cửa hàng không được để trống', 'bottom', 2000);
    } else if (!this.address) {
      loading.dismiss();
      this.customService.toastMessage('Địa chỉ cửa hàng không được để trống', 'bottom', 2000);
    } else if (!this.BIDN) {
      loading.dismiss();
      this.customService.toastMessage('Mã doanh nghiệp không được để trống', 'bottom', 2000);
    } else if (!this.friend_url) {
      loading.dismiss();
      this.customService.toastMessage('Friend url không được để trống', 'bottom', 2000);
    } else if (!this.owner_name) {
      loading.dismiss();
      this.customService.toastMessage('Tên chủ cửa hàng không được để trống', 'bottom', 2000);
    } else if (!this.owner_phone_number) {
      loading.dismiss();
      this.customService.toastMessage('Số điện thoại chủ cửa hàng không được để trống', 'bottom', 2000);
    } else if (!this.owner_address) {
      loading.dismiss();
      this.customService.toastMessage('Địa chỉ chủ cửa hàng không được để trống', 'bottom', 2000);
    } else if (!this.ssn) {
      loading.dismiss();
      this.customService.toastMessage('SSN không được để trống', 'bottom', 2000);
    } else if (!this.province && !this.district && !this.ward) {
      loading.dismiss();
      this.customService.toastMessage('Chưa chọn địa chỉ cửa hàng', 'bottom', 2000);
    } else if (!this.owner_province && !this.owner_district && !this.owner_ward) {
      loading.dismiss();
      this.customService.toastMessage('Chưa chọn địa chỉ chủ cửa hàng', 'bottom', 2000);
    } else if (this.rules == false) {
      loading.dismiss();
      this.customService.toastMessage('Bạn chưa đồng ý điều khoản của Amely !', 'bottom', 2000);
    } else {
      this.retryUpdateShop(5, loading)
    }
  }

  retryUpdateShop(retry, loading) {
    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.shopService.updateRequestShop(this.shop.guid, this.name, this.address, this.BIDN, this.price, this.friend_url, this.phone, this.owner_name,
      this.owner_phone_number, this.owner_address, this.ssn, this.province, this.district, this.ward, this.owner_province, this.owner_district, this.owner_ward).subscribe(
        data => {
          if (data.status) {
            this.appCtrl.getRootNav().pop();
            this.customService.toastMessage('Cập nhật thành công, đang chờ được duyệt !', 'bottom', 3000)
          } else {
            this.customService.toastMessage('Cập nhật thất bại , vui lòng thử lại .', 'bottom', 3000)
          }
          loading.dismiss();
        },
        err => { this.retryCreateShop(--retry, loading) })
  }
}
