import { NavParams } from 'ionic-angular/navigation/nav-params';
import { User } from './../../api/models/user';
import { CustomService } from './../../services/custom.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { App, ViewController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'app-find-friend',
  templateUrl: './find-friend.component.html'
})
export class FindFriendComponent implements OnInit {
  @Input('phone_number') phone_number: string;
  @Output() tabGotClosed = new EventEmitter<boolean>();
  user_found: User;
  public viewCtrl: ViewController;
  constructor(private appCtrl: App, private userService: UserService, private customService: CustomService, params: NavParams, private barcodeScanner: BarcodeScanner) {
    this.viewCtrl = params.data;
  }

  ngOnInit() { }

  findUser() {
    if (this.phone_number && this.phone_number.length > 7) {
      this.userService.findUser(this.phone_number).subscribe(
        data => {
          if (data.user.guid != null) {
            this.user_found = data.user;
            console.log(this.user_found);
            
          } else {
            this.user_found = null;
          }
        },
        err => {
          this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
        });
    } else {
      this.customService.toastMessage('Số điện thoại không hợp lệ', 'bottom', 2000);
    }
  }

  openUserProfile() {
    this.appCtrl.getRootNav().push(UserComponent, { userGuid: this.user_found.guid })
    this.viewCtrl.dismiss();
  }

  scanQR() {
    this.barcodeScanner.scan().then((barcodeData) => {
      const userID = barcodeData.text.substr(barcodeData.text.indexOf('/user/') + 6);
      this.appCtrl.getRootNav().push(UserComponent, { userGuid: userID })
    }, (err) => {
      this.customService.toastMessage('Mã QR không hợp lệ', 'bottom', 3000);
    });
  }
}
