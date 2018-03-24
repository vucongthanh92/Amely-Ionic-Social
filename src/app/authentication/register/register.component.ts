import { CustomService } from './../../services/custom.service';
import { Component, OnInit } from '@angular/core';
import { VerifycodeComponent } from "./../verifycode/verifycode.component";
import { NavController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { User } from '../../api/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  public birthdate: string;
  public email: string;
  // public email_re: string;
  public firstname: string;
  public gender: string = 'male';
  public lastname: string;
  public mobilelogin: string;
  public password: string;
  public password_re: string;
  public username: string;
  public is_show_privacy: boolean = false;
  public privacy: boolean = false;
  private year_current: number = (new Date()).getFullYear();
  constructor(public nav: NavController, private customService: CustomService, private userService: UserService) { }

  ngOnInit() {
    let u: User = new User();
    u.username = '12';
    u.password = '321';
    u.mobilelogin = '4124';
  }

  onChangeTime(e) {
    const year_reg = new Date(this.birthdate).getFullYear();
    if (this.year_current - year_reg <= 13) {
      this.is_show_privacy = true
    } else this.is_show_privacy = false
  }
  onSubmitRegister() {
    if (!this.firstname || !this.lastname) {
      this.customService.toastMessage('Họ tên không được phép để trống', 'bottom', 2000);
    } else if (!this.birthdate) {
      this.customService.toastMessage('Chưa chọn ngày sinh', 'bottom', 2000);
    } else if (!this.username) {
      this.customService.toastMessage('Tài khoản không được để trống', 'bottom', 2000);
    } else if (this.username.length < 6) {
      this.customService.toastMessage('Tài khoản tối đa 6 ký tự', 'bottom', 2000);
    } else if (!this.password) {
      this.customService.toastMessage('Mật khẩu không được để trống', 'bottom', 2000);
    } else if (this.password.length < 8) {
      this.customService.toastMessage('Mật khẩu tối đa 8 ký tự', 'bottom', 2000);
    } else if (!this.password_re) {
      this.customService.toastMessage('Nhập lại mật khẩu', 'bottom', 2000);
    } else if (this.password != this.password_re) {
      this.customService.toastMessage('Mật khẩu không trùng khớp', 'bottom', 2000);
    } else if (!this.email) {
      this.customService.toastMessage('Email không được để trống', 'bottom', 2000);
      // } else if (!this.email_re) {
      //   this.customService.toastMessage('Nhập lại email', 'bottom', 2000);
      // } else if (this.email != this.email_re) {
      //   this.customService.toastMessage('Email không trùng khớp', 'bottom', 2000);
    } else if (!this.mobilelogin) {
      this.customService.toastMessage('Số điện thoại không được phép để trống', 'bottom', 2000);
    } else if (this.is_show_privacy && !this.privacy) {
      this.customService.toastMessage('Bạn cần đồng ý với các điều khoản của amely', 'bottom', 2000);
    } else {
      this.userService.register(this.username, this.firstname, this.lastname, this.email, this.email, this.password, this.password_re, this.mobilelogin, this.birthdate, this.gender).subscribe(
        data => {
          if (data.status) {
            let u: User = new User();
            u.username = this.username;
            u.password = this.password;
            u.mobilelogin = this.mobilelogin;
            this.nav.setRoot(VerifycodeComponent, { user: u });
          } else {
            switch (data.error) {
              case 'fields_not_empty':
                this.customService.toastMessage('Dữ liệu chưa đầy đủ', 'bottom', 2000);
                break;
              case 'email_re_matching':
                this.customService.toastMessage('Xác thực lại email', 'bottom', 2000);
                break;
              case 'password_re_matching':
                this.customService.toastMessage('Xác thực lại mật khẩu', 'bottom', 2000);
                break;
              case 'username_format':
                this.customService.toastMessage('Sai định dạng tài khoản', 'bottom', 2000);
                break;
              case 'password_length':
                this.customService.toastMessage('Độ dài mật khẩu không hợp lệ', 'bottom', 2000);
                break;
              case 'mobile_format':
                this.customService.toastMessage('Số điện thoại sai định dạng', 'bottom', 2000);
                break;
              case 'username_exist':
                this.customService.toastMessage('Tài khoản đã tồn tại', 'bottom', 2000);
                break;
              case 'email_exist':
                this.customService.toastMessage('Email đã tồn tại', 'bottom', 2000);
                break;
              case 'email_format':
                this.customService.toastMessage('Sai định dạng email', 'bottom', 2000);
                break;
              case 'mobile_exist':
                this.customService.toastMessage('Số điện thoại đã tồn tại', 'bottom', 2000);
                break;
            }
          }
        })
    }
  }
}
