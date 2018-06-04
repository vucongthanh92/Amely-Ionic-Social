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

  dismiss() {
    this.nav.pop();
  }
 
}
