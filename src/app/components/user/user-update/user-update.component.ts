import { UserService } from './../../../services/user.service';
import { CustomService } from './../../../services/custom.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../api/models';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html'
})
export class UserUpdateComponent implements OnInit {

  public gender: string;
  public first_name: string;
  public last_name: string;
  public birthdate: string;
  public mobile_hidden: boolean;
  public birthdate_hidden: boolean;
  public friend_hidden: boolean;
  public callback: any;

  public user_current: User;
  constructor(private customService: CustomService, private userService: UserService, private nav: NavController, private navParams: NavParams, public loadingCtrl: LoadingController) {
    this.user_current = this.customService.user_current;
    this.gender = this.user_current.gender;
    this.first_name = this.user_current.first_name;
    this.last_name = this.user_current.last_name;
    this.birthdate = this.user_current.birthdate;
    this.mobile_hidden = !this.user_current.mobile_hidden || this.user_current.mobile_hidden == '0' ? false : true;
    this.birthdate_hidden = !this.user_current.birthdate_hidden || this.user_current.birthdate_hidden == '0' ? false : true;
    this.friend_hidden = !this.user_current.friends_hidden || this.user_current.friends_hidden == '0' ? false : true;
    console.log(this.mobile_hidden);
    console.log(this.birthdate_hidden);
    console.log(this.friend_hidden);

    this.callback = this.navParams.get('callback');
  }

  ngOnInit() {

  }

  updateInfo() {
    if (!this.first_name || !this.last_name) {
      this.customService.toastMessage('Họ tên không được để trống', 'bottom', 2000)
    } else {
      console.log(this.friend_hidden);
      let loading = this.loadingCtrl.create();
      loading.present();
      this.userService.updateProfile(this.first_name, this.last_name, null, this.gender, this.birthdate, null, this.friend_hidden == true ? '1' : '0'
        , this.mobile_hidden == true ? '1' : '0', this.birthdate_hidden == true ? '1' : '0').subscribe(data => {
          loading.dismiss();
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
            this.callback(true).then(() => {
              this.nav.pop()
            });
          } else {
            this.customService.toastMessage('Cập nhật thông tin thất bại. Vui lòng thử lại.', 'bottom', 2000);
          }
        }, err => this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại sau', 'bottom', 4000));
    }
  }
}
