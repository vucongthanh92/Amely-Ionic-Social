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
    if (!this.password || !this.rePassword) {
      this.customService.toastMessage("Vui lòng nhập đủ thông tin", "bottom", 3000);
    } else if (!this.customService.checkPasswordStrength(this.password)) {
      this.customService.toastMessage("Mật khẩu ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự in, thường và số.", "bottom", 3000);
    }
    else if (this.password != this.rePassword) {
      this.customService.toastMessage("Mật khẩu không trùng khớp", "bottom", 3000);
    } else {
      this.retryChangePassword(5, this.password);
    }
  }

  retryChangePassword(retry, password) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.authenticationService.changePassword(password, this.email).subscribe(data => {
      if (data.status) {
        this.customService.toastMessage("Mật khẩu đã được thay đổi", "bottom", 3000)
        this.nav.setRoot(SigninComponent);
      } else {
        this.customService.toastMessage("Thất bại. Vui lòng thử lại", "bottom", 3000)
      }
    }, err => this.retryChangePassword(--retry, password))
  }

  dismiss() {
    this.nav.pop();
  }
}
