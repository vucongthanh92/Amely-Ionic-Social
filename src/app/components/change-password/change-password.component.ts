import { NavController, App } from 'ionic-angular';
import { CustomService } from './../../services/custom.service';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

  @Input('old_pass') old_pass: string;
  @Input('new_pass') new_pass: string;
  @Input('renew_pass') renew_pass: string;

  constructor(private userService: UserService, private customService: CustomService, private nav: NavController, private appCtrl: App) { }

  ngOnInit() {
  }

  changePass() {
    if (!this.old_pass) {
      this.customService.toastMessage('Mật khẩu cũ không được để trống .', 'bottom', 2000);
    } else if (!this.new_pass) {
      this.customService.toastMessage('Mật khẩu mới không được để trống .', 'bottom', 2000);
    } else if (this.new_pass.length < 7) {
      this.customService.toastMessage('Mật khẩu mới phải ít nhất 8 ký tự .', 'bottom', 2000);
    } else if (!this.renew_pass) {
      this.customService.toastMessage('Nhập lại mật khẩu mới .', 'bottom', 2000);
    } else if (this.new_pass != this.renew_pass) {
      this.customService.toastMessage('Mật khẩu không trùng khớp .', 'bottom', 2000);
    } else {
      this.userService.changePassword(this.old_pass, this.new_pass, this.renew_pass).subscribe(data=>{
       if (data.status) {
         this.nav.pop();
         this.customService.toastMessage('Đổi mật khẩu thành công !', 'bottom', 2000);
       }else{
         this.customService.toastMessage('Thất bại','bottom',2000);
       }
     })
    }
  }

}
