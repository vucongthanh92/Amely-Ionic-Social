import { CustomService } from './../../services/custom.service';
import { UserService } from './../../services/user.service';
import { User } from './../../api/models/user';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

import { SigninComponent } from "./../signin/signin.component";

@Component({
  selector: 'app-verifycode',
  templateUrl: './verifycode.component.html'
})
export class VerifycodeComponent implements OnInit {
  user: User;
  mobile: string;
  code: string;
  timerVar;
  timerVal: number = 300;
  hide: boolean = true;

  constructor(private nav: NavController, private navParams: NavParams, private userService: UserService, private customService: CustomService,
    public loadingCtrl: LoadingController) {
    this.user = this.navParams.get('user');
    this.mobile = this.user.mobilelogin;
  }

  ngOnInit() {
  }

  onBackPress() {
    this.nav.setRoot(SigninComponent);
  }

  sendVerifyCode() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();
    if (!this.code) {
      loading.dismiss();
      this.customService.toastMessage('Chưa nhập mã kích hoạt', 'bottom', 2000);
    } else {
      this.retryActiveUser(5, loading)
    }
  }
  retryActiveUser(retry, loading) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.userService.activeUser(this.user.username, this.user.password, this.user.mobilelogin, this.code).subscribe(data => {
      if (data.status) {
        loading.dismiss();
        this.nav.setRoot(SigninComponent);
        this.customService.toastMessage('Kích hoạt thành công', 'bottom', 2000);
      } else {
        loading.dismiss();
        this.customService.toastMessage('Kích hoạt thất bại', 'bottom', 2000);
      }
    }, err => {
      this.retryActiveUser(--retry, loading);
    })
  }
  startTimer() {
    if (this.hide) {
      console.log(123213213);
      
    }
    this.timerVar = Observable.interval(1000).subscribe(x => {
      this.timerVal--;
      this.hide = false;
      
      if (this.timerVal == 0) {
        this.timerVar.unsubscribe();
        this.timerVal = 300;
        this.hide = true;
      }
    })
  }
}
