import { ForgotVertifyComponent } from './forgot-vertify/forgot-vertify.component';
import { Component, OnInit } from '@angular/core';
import { CustomService } from '../../services/custom.service';
import { AuthenticationService } from '../authentication.service';
import { LoadingController, NavController } from 'ionic-angular';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html'
})
export class ForgotComponent implements OnInit {
  usernameInput: string;
  username: string;
  phonenumberInput: string;
  phonenumber: string;
  constructor(private customService: CustomService, private authenticationService: AuthenticationService,
    public loadingCtrl: LoadingController, public nav: NavController) { }

  ngOnInit() {
  }

  forgotPassword() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (this.usernameInput && this.phonenumberInput) {
      this.retrySendEmail(5, this.usernameInput, this.phonenumberInput, loading)
    } else {
      loading.dismiss();
      this.customService.toastMessage("Tài khoản hoặc số diện thoại không hợp lệ", 'bottom', 3000);
    }
  }

  retrySendEmail(retry, username, mobile, loading) {
    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.authenticationService.forgotPassword(username, mobile).subscribe(data => {
      if (data.status) {
        this.username = username;
        this.phonenumber = mobile;
        // this.activationCode();
        this.nav.push(ForgotVertifyComponent, { username: this.usernameInput, mobile: this.phonenumberInput });
        loading.dismiss();
      } else {
        this.customService.toastMessage("Thất bại. Vui lòng thử lại", "bottom", 3000)
        loading.dismiss();
      }

    }, err => {
      this.retrySendEmail(--retry, username, mobile, loading)
    })
  }

  dismiss() {
    this.nav.pop();
  }

}
