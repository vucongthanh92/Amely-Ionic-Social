import { ShopsService } from './../../services/shops.service';
import { NavParams, App, LoadingController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Shop } from '../../api/models';
import { CustomService } from '../../services/custom.service';

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

  constructor(private navParams: NavParams, private appCtrl: App, private customService: CustomService, private shopService: ShopsService,
    public loadingCtrl: LoadingController) {
    this.shop = this.navParams.get('shop');
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
    }

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
    } else {

      this.shopService.createShop(this.shipping_method, this.name, this.address, this.BIDN, this.price, this.friend_url, this.phone, this.owner_name,
        this.owner_phone_number, this.owner_address, this.ssn, null).subscribe(
        data => {
          if (data.status) {
            this.appCtrl.getRootNav().pop();
          } else {
            this.customService.toastMessage('Đăng ký thất bại , vui lòng thử lại .', 'bottom', 3000)
          }
          loading.dismiss();
        },
        err => {
          this.customService.toastMessage('Đăng ký thất bại , vui lòng thử lại .', 'bottom', 3000)
        })
    }
  }
}
