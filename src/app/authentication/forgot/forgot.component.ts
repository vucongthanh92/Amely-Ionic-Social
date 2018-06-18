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
  emailInput: string;
  email: string;
  constructor(private customService: CustomService, private authenticationService: AuthenticationService,
    public loadingCtrl: LoadingController, public nav: NavController) { }

  ngOnInit() {
  }

  forgotPassword() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (this.emailInput && this.emailInput.length > 5) {
      this.retrySendEmail(5, this.emailInput, loading)
    } else {
      loading.dismiss();
      this.customService.toastMessage("Email không hợp lệ", 'bottom', 3000);
    }
  }

  retrySendEmail(retry, email, loading) {
    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.authenticationService.forgotPassword(email).subscribe(data => {
      if (data.status) {
        this.email = email;
        // this.activationCode();
        this.nav.push(ForgotVertifyComponent, { email: this.emailInput });
        loading.dismiss();
      } else {
        this.customService.toastMessage("Thất bại. Vui lòng thử lại", "bottom", 3000)
        loading.dismiss();
      }

    }, err => {
      this.retrySendEmail(--retry, email, loading)
    })
  }

  dismiss() {
    this.nav.pop();
  }
 
}
