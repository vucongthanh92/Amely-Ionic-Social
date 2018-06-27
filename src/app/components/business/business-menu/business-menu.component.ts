import { Component, OnInit } from '@angular/core';
import { CustomService } from '../../../services/custom.service';
import { FirebaseService } from '../../../services/firebase.service';
import { ActionSheetController, NavParams, NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Business } from '../../../api/models';

@Component({
  selector: 'app-business-menu',
  templateUrl: './business-menu.component.html'
})
export class BusinessMenuComponent implements OnInit {
  private page: Business;
  private callback: any;
  constructor(private actionSheetCtrl: ActionSheetController, private navParams: NavParams, private nav: NavController,
    private camera: Camera, private fbService: FirebaseService, private customService: CustomService) {
    this.page = this.navParams.get("page");
    this.callback = this.navParams.get("callback");
  }

  ngOnInit() {
  }

  changeCover() {
    this.nav.pop();
    this.customService.imageAction(this.actionSheetCtrl, this.camera, this.fbService,false).then(url => {
      let images = [url + ''];
      this.retryUpdateCover(5, images);
    })
  }

  retryUpdateCover(retry, images) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.customService.updateCover(+this.page.guid, "business", images).subscribe(data => {
      if (data.status) {
        this.callback({ url: data + "", isAvatar: false }).then(() => {
        });
      } else {
        this.customService.toastMessage("Đã có lỗi vui lòng thử lại.", "bottom", 3000);
      }
    }, err => this.retryUpdateCover(--retry, images))
  }

  changeAvatar() {
    this.nav.pop();
    this.customService.imageAction(this.actionSheetCtrl, this.camera, this.fbService, false).then(url => {
      let images = [url + ''];
      this.retryChangeAvatar(5, images)

    })
  }

  retryChangeAvatar(retry, images) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.customService.updateAvatar(+this.page.guid, "business", images).subscribe(data => {
      console.log(data);

      if (data.status) {
        this.callback({ url: data + "", isAvatar: true }).then(() => {
        });
      } else {
        this.customService.toastMessage("Đã có lỗi vui lòng thử lại.", "bottom", 3000);
      }
    },err=>this.retryChangeAvatar(--retry, images))
  }
}
