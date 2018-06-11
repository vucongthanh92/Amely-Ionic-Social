import { CustomService } from './../../../services/custom.service';
import { SigninComponent } from './../../../authentication/signin/signin.component';
import { AlertController, App, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-setting-general',
  templateUrl: './setting-general.component.html'
})
export class SettingGeneralComponent implements OnInit {

  private languageResult: string = 'Tiếng Việt';
  constructor(public alertCtrl: AlertController, public appCtrl: App, public nav: NavController, private customService: CustomService) { }

  ngOnInit() {
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: 'Xác nhận đăng xuất',
      message: 'Bạn có muốn đăng xuất khỏi hệ thống?',
      buttons: [
        {
          text: 'Từ chối',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Chấp nhận',
          handler: () => {
            this.customService.notifications = [];
            this.customService.cart = [];
            localStorage.clear();
            this.appCtrl.getRootNav().setRoot(SigninComponent);
          }
        }
      ]
    });
    alert.present();
  }
  changeLanguage() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Đổi ngôn ngữ');

    alert.addInput({
      type: 'radio',
      label: 'Tiếng Việt',
      value: 'vi',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'English',
      value: 'en'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('Radio data:', data);
        this.languageResult = data;
      }
    });
    alert.present();
  }
}
