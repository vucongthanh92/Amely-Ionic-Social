import { ForgotVertifyComponent } from './forgot-vertify/forgot-vertify.component';
import { Component, OnInit } from '@angular/core';
import { CustomService } from '../../services/custom.service';
import { AuthenticationService } from '../authentication.service';
import { LoadingController, AlertController, NavController } from 'ionic-angular';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html'
})
export class ForgotComponent implements OnInit {
  emailInput: string;
  email: string;
  constructor(private customService: CustomService, private authenticationService: AuthenticationService,
    public loadingCtrl: LoadingController, private alertCtrl: AlertController, public nav: NavController) { }

  ngOnInit() {
  }

  forgotPassword() {
    if (this.emailInput && this.emailInput.length > 5) {
      this.retrySendEmail(5, this.emailInput)
    } else {
      this.customService.toastMessage("Email không hợp lệ", 'bottom', 3000);
    }
  }

  retrySendEmail(retry, email) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.authenticationService.forgotPassword(email).subscribe(data => {
      if (data.status) {
        this.email = email;
        // this.activationCode();
        this.nav.push(ForgotVertifyComponent, { email: this.emailInput });
      } else {
        this.customService.toastMessage("Thất bại. Vui lòng thử lại", "bottom", 3000)
      }

    }, err => {
      this.retrySendEmail(--retry, email)
    })
  }

  activationCode() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });

    let alert = this.alertCtrl.create({
      title: 'Nhập mã xác nhận',
      enableBackdropDismiss: false,
      inputs: [
        {
          name: 'code',
          placeholder: 'Mã xác nhận',
        }
      ],
      buttons: [
        {
          text: 'Từ chối',
        },
        {
          text: 'Chấp nhận',
          handler: data => {
            if (data.code) {
              loading.present();
              this.retryActivation(5, this.email, data.code, loading);
            } else {
              this.customService.toastMessage("Chưa nhập mã xác nhận", 'bottom', 3000);
            }
          }
        }
      ]
    });
    alert.present();
  }

  retryActivation(retry, email, code, loading) {
    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.authenticationService.activation(code, email).subscribe(data => {
      if (data.status) {
        loading.dismiss();
        this.changePassword();
      } else {
        this.customService.toastMessage("Thất bại. Vui lòng thử lại", "bottom", 3000)
      }
    })
  }

  changePassword() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });

    let alert = this.alertCtrl.create({
      title: 'Đổi mật khẩu',
      enableBackdropDismiss: false,
      inputs: [
        {
          name: 'password',
          placeholder: 'Nhập mật khẩu mới',
          type: 'password'
        },
        {
          name: 'rePassword',
          placeholder: 'Xác nhận mật khẩu',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Từ chối',
        },
        {
          text: 'Chấp nhận',
          handler: data => {
            if (!data.password || !data.rePassword) {
              this.customService.toastMessage("Vui lòng nhập đủ thông tin", "bottom", 3000);
            } else if (!this.customService.checkPasswordStrength(data.password)) {
              this.customService.toastMessage("Mật khẩu ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự in, thường và số.", "bottom", 3000);
            }
            else if (data.password != data.rePassword) {
              this.customService.toastMessage("Mật khẩu không trùng khớp", "bottom", 3000);
            } else {
              loading.present();
              this.retryChangePassword(5, data.password, loading);
            }
          }
        }
      ]
    });
    alert.present();
  }

  retryChangePassword(retry, password, loading) {
    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.authenticationService.changePassword(password, this.email).subscribe(data => {
      if (data.status) {
        loading.dismiss();
        this.customService.toastMessage("Mật khẩu đã được thay đổi", "bottom", 3000)
      } else {
        this.customService.toastMessage("Thất bại. Vui lòng thử lại", "bottom", 3000)
      }
    }, err => this.retryChangePassword(--retry, password, loading))
  }
}
