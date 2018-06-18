import { SigninComponent } from './../../signin/signin.component';
import { Component, OnInit } from '@angular/core';
import { CustomService } from '../../../services/custom.service';
import { AuthenticationService } from '../../authentication.service';
import { LoadingController,  NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'app-forgot-change-pass',
  templateUrl: './forgot-change-pass.component.html'
})
export class ForgotChangePassComponent implements OnInit {
  password: String;
  rePassword: String;
  email: string;
  constructor(
    private customService: CustomService, private authenticationService: AuthenticationService,
    public loadingCtrl: LoadingController,public nav: NavController, private navParams: NavParams
  ) { 
    this.email = this.navParams.get('email');
  }

  ngOnInit() {
   
  }

  changePassword(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (!this.password || !this.rePassword) {
      this.customService.toastMessage("Vui lòng nhập đủ thông tin", "bottom", 3000);
      loading.dismiss();
    } else if (!this.customService.checkPasswordStrength(this.password)) {
      this.customService.toastMessage("Mật khẩu ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự in, thường và số.", "bottom", 3000);
      loading.dismiss();
    }
    else if (this.password != this.rePassword) {
      this.customService.toastMessage("Mật khẩu không trùng khớp", "bottom", 3000);
      loading.dismiss();
    } else {
      this.retryChangePassword(5, this.password, loading);
    }
  }

  retryChangePassword(retry, password, loading) {
    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.authenticationService.changePassword(password, this.email).subscribe(data => {
      if (data.status) {
        this.customService.toastMessage("Mật khẩu đã được thay đổi", "bottom", 3000)
        this.nav.setRoot(SigninComponent);
        loading.dismiss();
      } else {
        this.customService.toastMessage("Thất bại. Vui lòng thử lại", "bottom", 3000)
        loading.dismiss();
      }
    }, err => this.retryChangePassword(--retry, password, loading))
  }

  dismiss() {
    this.nav.pop();
  }
}
