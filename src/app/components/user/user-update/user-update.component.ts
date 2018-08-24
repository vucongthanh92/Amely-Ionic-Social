import { SearchService } from './../../../services/search.service';
import { PROVINCES } from './../../../provinces';
import { WARDS } from './../../../wards';
import { DISTRICTS } from './../../../districts';
import { UserService } from './../../../services/user.service';
import { CustomService } from './../../../services/custom.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../api/models';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FirebaseService } from '../../../services/firebase.service';
import { SigninComponent } from '../../../authentication/signin/signin.component';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html'
})
export class UserUpdateComponent implements OnInit {

  public gender: string;
  public first_name: string;
  public last_name: string;
  public birthdate: string;
  public email: string;
  public mobile_hidden: boolean;
  public birthdate_hidden: boolean;
  public friend_hidden: boolean;
  public callback: any;
  public provinces;
  public wards;
  public districts;
  public address;
  public province_id;
  public ward_id;
  public district_id;
  public showError: boolean;
  public user_current: User;
  constructor(private customService: CustomService, private userService: UserService, private nav: NavController,
    private navParams: NavParams, public loadingCtrl: LoadingController, private fbService: FirebaseService, private searchService: SearchService) {
    this.user_current = this.customService.user_current;
    this.gender = this.user_current.gender;
    this.first_name = this.user_current.first_name;
    this.last_name = this.user_current.last_name;
    this.email = this.user_current.email;
    this.birthdate = this.user_current.birthdate;
    this.province_id = this.user_current.province;
    this.district_id = this.user_current.district;
    this.ward_id = this.user_current.ward;
    this.address = this.user_current.address;
    this.mobile_hidden = !this.user_current.mobile_hidden || this.user_current.mobile_hidden == '0' ? false : true;
    this.birthdate_hidden = !this.user_current.birthdate_hidden || this.user_current.birthdate_hidden == '0' ? false : true;
    this.friend_hidden = !this.user_current.friends_hidden || this.user_current.friends_hidden == '0' ? false : true;
    this.callback = this.navParams.get('callback');
    this.showError = this.navParams.get('showError');
    this.provinces = PROVINCES;
    this.districts = this.province_id ? DISTRICTS.filter(data => data.provinceid == this.province_id) : undefined;
    this.wards = this.district_id ? WARDS.filter(data => data.districtid == this.district_id) : undefined;
  }

  ngOnInit() {

  }

  onProvinceChange(provinceid: string) {
    this.districts = DISTRICTS.filter(data => data.provinceid == provinceid);
    this.wards = false;
    this.ward_id = null;
    this.district_id = null;
  }

  onDistrictChange(districtid: string) {
    this.wards = WARDS.filter(data => data.districtid == districtid);
    this, this.ward_id = null;
  }

  onWardChange(wardid: string) {

  }

  updateInfo() {
    if (!this.first_name || !this.last_name) {
      this.customService.toastMessage('Họ tên không được để trống', 'bottom', 2000)
    } else if (!this.address || !this.province_id || !this.district_id || !this.ward_id) {
      this.customService.toastMessage('Vui lòng cập nhật địa chỉ cá nhân', 'bottom', 2000)
    } else {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...',
        enableBackdropDismiss: true
      });
      loading.present();
      this.retryUpdateProfile(5, loading);
    }
  }

  retryUpdateProfile(retry, loading) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.userService.updateProfile(this.first_name, this.last_name, null, this.gender, this.birthdate, null, this.friend_hidden == true ? '1' : '0'
      , this.mobile_hidden == true ? '1' : '0', this.birthdate_hidden == true ? '1' : '0', this.province_id, this.district_id, this.ward_id, this.address).subscribe(data => {
        if (data.status) {
          this.customService.toastMessage('Cập nhật thông tin thành công', 'bottom', 2000);
          this.customService.user_current.first_name = this.first_name;
          this.customService.user_current.last_name = this.last_name;
          this.customService.user_current.birthdate = this.birthdate;
          this.customService.user_current.gender = this.gender;
          this.customService.user_current.friends_hidden = this.friend_hidden ? '1' : '0';
          this.customService.user_current.mobile_hidden = this.mobile_hidden ? '1' : '0';
          this.customService.user_current.birthdate_hidden = this.birthdate_hidden ? '1' : '0';
          this.customService.user_current.fullname = this.first_name + " " + this.last_name;
          this.customService.user_current.province = this.province_id;
          this.customService.user_current.district = this.district_id;
          this.customService.user_current.ward = this.ward_id;
          this.customService.user_current.address = this.address;
          if (this.showError) {
            this.callback(true).then(() => {
              this.nav.setRoot(SigninComponent);
            });
            this.updateUserFirebase(this.birthdate, this.gender);
          } else {
            this.nav.pop();
          }
        } else {
          this.customService.toastMessage('Cập nhật thông tin thất bại. Vui lòng thử lại.', 'bottom', 2000);
        }
        loading.dismiss();
      }, err => this.retryUpdateProfile(--retry, loading));
  }

  dismiss() {
    this.nav.pop();
  }

  updateUserFirebase(birthdate, gender) {
    try {
      let d: Date = new Date(birthdate);
      // this.fbService.updateProfile(this.user_current.username, d.getFullYear() + "", gender);
      this.searchService.updateGeoUser(this.user_current.guid + "", null, null, d.getFullYear() + "", null, null, gender).then().catch();
    } catch (error) {

    }
  }
}
