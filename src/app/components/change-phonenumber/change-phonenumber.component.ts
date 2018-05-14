import { NavController, AlertController } from 'ionic-angular';
import { CustomService } from './../../services/custom.service';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-phonenumber',
  templateUrl: './change-phonenumber.component.html'
})
export class ChangePhonenumberComponent implements OnInit {
  @Input('phone_number') phone_number: string;
  constructor(private userService: UserService, private customService: CustomService,
    private nav: NavController, private alertCtrl: AlertController) {
  }

  ngOnInit() {
  }
  changePhoneNumber() {
    if (!this.phone_number || this.phone_number.length < 8) {
      this.customService.toastMessage('Số điện thoại không hợp lệ', 'bottom', 2000);
    } else {
      this.retryChangePhoneNumber(5);
    }
  }
  retryChangePhoneNumber(retry) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.customService.confirmPassword(this.alertCtrl, this.userService)
      .then(() => {
        this.userService.changePhoneNumber(this.phone_number).subscribe(data => {
          if (!data.status) {
            this.customService.toastMessage('Thất bại. Vui lòng thử lại.', 'bottom', 2000);
          } else {
            this.customService.toastMessage('Số điện thoại đã được đổi .', 'bottom', 2000);
            this.nav.pop();
          }
        }
          , err => {
            this.retryChangePhoneNumber(--retry)
          });
      })
  }
}
