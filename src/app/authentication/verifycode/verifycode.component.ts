import { CustomService } from './../../services/custom.service';
import { UserService } from './../../services/user.service';
import { User } from './../../api/models/user';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SigninComponent } from "./../signin/signin.component";

@Component({
  selector: 'app-verifycode',
  templateUrl: './verifycode.component.html'
})
export class VerifycodeComponent implements OnInit {
  user: User;
  code: string;
  constructor(private nav: NavController, private navParams: NavParams, private userService: UserService, private customService: CustomService) {
    this.user = this.navParams.get('user');
  }

  ngOnInit() {
  }

  onBackPress() {
    this.nav.setRoot(SigninComponent);
  }

  sendVerifyCode() {
    if (!this.code) {
      this.customService.toastMessage('Chưa nhập mã kích hoạt', 'bottom', 2000);
    }else{
    this.userService.activeUser(this.user.username,this.user.password,this.user.mobilelogin,this.code).subscribe(data=>{
      if (data.status) {
        this.nav.setRoot(SigninComponent);
        this.customService.toastMessage('Kích hoạt thành công', 'bottom', 2000);
      }else{
        this.customService.toastMessage('Kích hoạt thất bại', 'bottom', 2000);
      }
    })
    
    }
  }
}
