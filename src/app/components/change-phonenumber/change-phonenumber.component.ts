import { AlertController, LoadingController } from 'ionic-angular';
import { CustomService } from './../../services/custom.service';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../api/models';

@Component({
  selector: 'app-change-phonenumber',
  templateUrl: './change-phonenumber.component.html'
})
export class ChangePhonenumberComponent implements OnInit {
  @Input('phone_number') phone_number: string;
  @Input('password') password: string;
  private userCurrent: User;
  constructor(private userService: UserService, private customService: CustomService, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.userCurrent = this.customService.user_current;
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
      .then((password) => {
        this.userService.changePhoneNumber(this.phone_number).subscribe(data => {
          console.log(data);

          if (!data.status) {
            this.customService.toastMessage('Thất bại. Vui lòng thử lại.', 'bottom', 2000);
          } else {
            this.showAlertConfirmCode();
            this.password = password + "";
          }
        }
          , err => {
            this.retryChangePhoneNumber(--retry)
          });
      })
  }

  showAlertConfirmCode() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });


    let alert = this.alertCtrl.create({
      title: 'Nhập mã xác nhận được gửi vào số điện thoại đã được thay đổi',
      enableBackdropDismiss: false,
      inputs: [
        {
          name: 'code',
          placeholder: 'Mã xác nhận',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Từ chối',
        },
        {
          text: 'Chấp nhận',
          handler: data => {
            console.log(data);
            
            if (data.code) {
              loading.present();
              this.retryVerifyCode(5, data.code, loading)
            } else {
              this.customService.toastMessage("Vui lòng nhập mã xác nhận", 'bottom', 3000);
            }
          }
        }
      ]
    });
    alert.present();
  }

  retryVerifyCode(retry, code, loading) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }

    console.log(this.password);
    console.log(this.phone_number);
    console.log(code);
    console.log(this.userCurrent.username);
    
    this.userService.activeUser(this.userCurrent.username, this.password, this.phone_number, code).subscribe(data => {
      console.log(data);
      loading.dismiss();
      if (data.status) {
        this.customService.toastMessage("Số điện thoại đã được thay đổi", "bottom", 3000)
      } else {
        this.customService.toastMessage("Mã xác nhận không phù hợp", "bottom", 3000)
      }
    }, err => this.retryVerifyCode(--retry, code, loading))
  }
}
