import { CustomService } from './../../../services/custom.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../api/models';
import { AlertController, ViewController } from 'ionic-angular';

@Component({
  selector: 'app-user-block-list',
  templateUrl: './user-block-list.component.html'
})
export class UserBlockListComponent implements OnInit {
  blockList: Array<User>
  constructor(private userService: UserService, private customService: CustomService, private alertCtrl: AlertController, public viewCtrl: ViewController) { }

  ngOnInit() {
    this.loadData(5);
  }

  loadData(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.userService.blockList().subscribe(data => {
      this.blockList = data;
    }, err => this.loadData(--retry))
  }
  dismiss() {
    console.log(2134123);

    this.viewCtrl.dismiss();
  }

  unblock(user: User) {
    let confirm = this.alertCtrl.create({
      title: 'Xác nhận',
      message: 'Bạn có muốn bỏ chặn với ' + user.fullname + ' ?',
      buttons: [
        {
          text: 'Từ chối'
        },
        {
          text: 'Chấp nhận',
          handler: () => {
            this.userService.unblock(user.guid).subscribe(data => {
              if (data.status) {
                this.blockList = this.blockList.filter(e => e.guid != user.guid)
                this.customService.toastMessage('Bỏ chặn ' + user.fullname + " thành công", 'bottom', 2000);
              } else {
                this.customService.toastMessage('Bỏ chặn ' + user.fullname + " thất bại", 'bottom', 2000);
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
