import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { CustomService } from '../../../services/custom.service';
import { AuthenticationService } from '../../authentication.service';
import { ForgotChangePassComponent } from '../forgot-change-pass/forgot-change-pass.component';

@Component({
  selector: 'app-forgot-vertify',
  templateUrl: './forgot-vertify.component.html'
})
export class ForgotVertifyComponent implements OnInit {
  username: string;
  mobile: string;
  code: string;
  constructor(private customService: CustomService, private authenticationService: AuthenticationService,
    public loadingCtrl: LoadingController, public nav: NavController, private navParams: NavParams) {
    this.username = this.navParams.get('username');
    this.mobile = this.navParams.get('mobile');
  }

  ngOnInit() {
  }

  activationCode() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (this.code) {
      this.retryActivation(5, this.username, this.mobile, this.code, loading);
    } else {
      this.customService.toastMessage("Chưa nhập mã xác nhận", 'bottom', 3000);
      loading.dismiss();
    }
  }

  retryActivation(retry, username, phone, code, loading) {
    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.authenticationService.activation(code, username, phone).subscribe(data => {
      if (data.status) {
        // this.changePassword();
        this.nav.push(ForgotChangePassComponent, { username: this.username, mobile: this.mobile });
        loading.dismiss();
      } else {
        this.customService.toastMessage("Thất bại. Vui lòng thử lại", "bottom", 3000)
        loading.dismiss();
      }
    }, err => {
      this.retryActivation(--retry, username, phone, code, loading)
    })
  }

  dismiss() {
    this.nav.pop();
  }
}
