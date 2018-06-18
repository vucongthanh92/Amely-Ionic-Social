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
  email: string;
  code: string;
  constructor(private customService: CustomService, private authenticationService: AuthenticationService,
    public loadingCtrl: LoadingController,public nav: NavController, private navParams: NavParams) {
    this.email = this.navParams.get('email');
  }

  ngOnInit() {
  }

  activationCode() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (this.code) {
      this.retryActivation(5, this.email, this.code, loading);
    } else {
      this.customService.toastMessage("Chưa nhập mã xác nhận", 'bottom', 3000);
      loading.dismiss();
    }
  }

  retryActivation(retry, email, code, loading) {
    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.authenticationService.activation(code, email).subscribe(data => {
      if (data.status) {
        // this.changePassword();
        this.nav.push(ForgotChangePassComponent, {email: this.email});
        loading.dismiss();
      } else {
        this.customService.toastMessage("Thất bại. Vui lòng thử lại", "bottom", 3000)
        loading.dismiss();
      }
     },err => {
       this.retryActivation(--retry, email, code, loading)
    })
  }

  dismiss() {
    this.nav.pop();
  }
}
