import { NavController, LoadingController } from 'ionic-angular';
import { CustomService } from './../../services/custom.service';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SigninComponent } from '../../authentication/signin/signin.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

  @Input('old_pass') old_pass: string;
  @Input('new_pass') new_pass: string;
  @Input('renew_pass') renew_pass: string;

  constructor(private userService: UserService, private customService: CustomService, private nav: NavController, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  changePass() {
    if (!this.old_pass) {
      this.customService.toastMessage('Mật khẩu cũ không được để trống .', 'bottom', 2000);
    } else if (!this.new_pass) {
      this.customService.toastMessage('Mật khẩu mới không được để trống .', 'bottom', 2000);
    } else if (!this.customService.checkPasswordStrength(this.new_pass.length)) {
      this.customService.toastMessage('Mật khẩu tối đa 8 ký tự và bao gồm ít nhất 1 ký tự in, thường và số.', 'bottom', 2000);
    } else if (!this.renew_pass) {
      this.customService.toastMessage('Nhập lại mật khẩu mới .', 'bottom', 2000);
    } else if (this.new_pass != this.renew_pass) {
      this.customService.toastMessage('Mật khẩu không trùng khớp .', 'bottom', 2000);
    } else {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...',
        enableBackdropDismiss: true
      });

      loading.present();
      this.retryChangePass(5, loading)
    }
  }

  retryChangePass(retry, loading) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      loading.dismiss();
      return;
    }
    this.userService.changePassword(this.old_pass, this.new_pass, this.renew_pass).subscribe(data => {
      loading.dismiss();
      if (data.status) {
        this.nav.setRoot(SigninComponent);
        this.customService.toastMessage('Đổi mật khẩu thành công !', 'bottom', 2000);
      } else {
        this.customService.toastMessage('Thất bại', 'bottom', 2000);
      }
    }, err => {
      this.retryChangePass(--retry, loading);
    })
  }

  dismiss() {
    this.nav.pop();
  }
}
