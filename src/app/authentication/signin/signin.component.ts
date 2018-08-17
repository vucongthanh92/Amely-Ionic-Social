import { VerifycodeComponent } from './../verifycode/verifycode.component';
import { CustomService } from './../../services/custom.service';
import { GeolocationService } from './../../services/geolocation.service';
import { AuthenticationService } from './../authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { RegisterComponent } from "../register/register.component";
import { ToastController } from 'ionic-angular';
import { MainMenuComponent } from '../../layout/main-menu/main-menu.component';
import { Geolocation } from '@ionic-native/geolocation';
import { ApiService } from '../../api/services';
import { ForgotComponent } from '../forgot/forgot.component';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  @Input('username') username: string;
  @Input('password') password: string;

  latitude: any;
  longitude: any;
  is_logging: boolean = false;
  loader;
  email: string;

  constructor(
    public geolocationService: GeolocationService,
    public geolocation: Geolocation,
    private authenticationService: AuthenticationService,
    public nav: NavController,
    private toastCtrl: ToastController,
    private api: ApiService,
    private customService: CustomService,
    public loadingCtrl: LoadingController
    // private alertCtrl: AlertController
  ) {
  }

  ngOnInit() {
  }

  onLogin() {
    this.is_logging = true;
    this.loader = this.loadingCtrl.create();
    this.loader.present();
    if (!this.username) {
      this.loader.dismiss();
      this.customService.toastMessage('Tên đăng nhập không được phép để trống!', 'bottom', 3000);
    } else if (!this.password) {
      this.loader.dismiss();
      this.customService.toastMessage('Mật khẩu không được phép để trống!', 'bottom', 3000);
    } else {
      this.retryLogin(5);
    }
  }

  setUsername(username) {
    this.username = username.toLowerCase();
  }

  onRegister() {
    // this.nav.push(MapComponent);
    this.nav.push(RegisterComponent);
  }

  retryLogin(retry) {
    if (retry == 0) {
      this.loader.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.authenticationService.login(this.username.toLowerCase(), this.password).subscribe(resp => {
      this.is_logging = false;
      this.loader.dismiss();

      if (resp.token == null) {
        if (resp.validation) {
          let u = resp.validation;
          u.password = this.password;
          this.nav.push(VerifycodeComponent, { user: u });
        } else {
          const toast = this.toastCtrl.create({
            message: 'Đăng nhập thất bại, Tên đăng nhập hoặc mật khẩu không đúng !',
            position: "bottom",
            duration: 3000
          });
          toast.present();
        }
      } else {
        this.retryLoadProfile(5, resp);
      }
    }, err => {
      this.retryLogin(--retry);
    });
  }

  retryLoadProfile(retry, resp) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.api.getProfile({}).subscribe(data => {
      // this.loader.dismiss();
      localStorage.setItem('loggin_user', JSON.stringify(data));
      this.customService.user_current = data;
      this.authenticationService.setSession(resp);
      localStorage.setItem('baer', JSON.stringify(resp));
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        localStorage.setItem("lat", this.latitude);
        localStorage.setItem("lng", this.longitude);
        this.geolocationService.setLocation(this.username, this.latitude, this.longitude);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
      this.nav.setRoot(MainMenuComponent);
    }, err => {
      this.retryLoadProfile(--retry, resp);
    })
  }

  forgotPassword() {
    // this.sendEmail();
    this.nav.push(ForgotComponent);
  }

  // sendEmail() {
  //   let loading = this.loadingCtrl.create({
  //     content: 'Please wait...',
  //     enableBackdropDismiss: true
  //   });


  //   let alert = this.alertCtrl.create({
  //     title: 'Nhập email của tài khoản',
  //     enableBackdropDismiss: false,
  //     inputs: [
  //       {
  //         name: 'email',
  //         placeholder: 'Email',
  //         type: 'email'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Từ chối',
  //       },
  //       {
  //         text: 'Chấp nhận',
  //         handler: data => {
  //           if (data.email && data.email.length > 5) {
  //             loading.present();
  //             this.retrySendEmail(5, data.email, loading)
  //           } else {
  //             this.customService.toastMessage("Email không hơp lệ", 'bottom', 3000);
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  // activationCode() {
  //   let loading = this.loadingCtrl.create({
  //     content: 'Please wait...',
  //     enableBackdropDismiss: true
  //   });

  //   let alert = this.alertCtrl.create({
  //     title: 'Nhập mã xác nhận',
  //     enableBackdropDismiss: false,
  //     inputs: [
  //       {
  //         name: 'code',
  //         placeholder: 'Mã xác nhận',
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Từ chối',
  //       },
  //       {
  //         text: 'Chấp nhận',
  //         handler: data => {
  //           if (data.code) {
  //             loading.present();
  //             this.retryActivation(5, this.email, data.code, loading);
  //           } else {
  //             this.customService.toastMessage("Chưa nhập mã xác nhận", 'bottom', 3000);
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  // changePassword() {
  //   let loading = this.loadingCtrl.create({
  //     content: 'Please wait...',
  //     enableBackdropDismiss: true
  //   });

  //   let alert = this.alertCtrl.create({
  //     title: 'Đổi mật khẩu',
  //     enableBackdropDismiss: false,
  //     inputs: [
  //       {
  //         name: 'password',
  //         placeholder: 'Nhập mật khẩu mới',
  //         type: 'password'
  //       },
  //       {
  //         name: 'rePassword',
  //         placeholder: 'Xác nhận mật khẩu',
  //         type: 'password'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Từ chối',
  //       },
  //       {
  //         text: 'Chấp nhận',
  //         handler: data => {
  //           if (!data.password || !data.rePassword) {
  //             this.customService.toastMessage("Vui lòng nhập đủ thông tin", "bottom", 3000);
  //           } else if (!this.customService.checkPasswordStrength(data.password)) {
  //             this.customService.toastMessage("Mật khẩu ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự in, thường và số.", "bottom", 3000);
  //           }
  //           else if (data.password != data.rePassword) {
  //             this.customService.toastMessage("Mật khẩu không trùng khớp", "bottom", 3000);
  //           } else {
  //             loading.present();
  //             this.retryChangePassword(5, data.password, loading);
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  // retryChangePassword(retry, password, loading) {
  //   if (retry == 0) {
  //     loading.dismiss();
  //     this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
  //     return;
  //   }
  //   this.authenticationService.changePassword(password, this.email).subscribe(data => {
  //     if (data.status) {
  //       loading.dismiss();
  //       this.customService.toastMessage("Mật khẩu đã được thay đổi", "bottom", 3000)
  //     } else {
  //       this.customService.toastMessage("Thất bại. Vui lòng thử lại", "bottom", 3000)
  //     }
  //   }, err => this.retryChangePassword(--retry, password, loading))
  // }

  // retryActivation(retry, email, code, loading) {
  //   if (retry == 0) {
  //     loading.dismiss();
  //     this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
  //     return;
  //   }
  //   this.authenticationService.activation(code, email).subscribe(data => {
  //     if (data.status) {
  //       loading.dismiss();
  //       this.changePassword();
  //     } else {
  //       this.customService.toastMessage("Thất bại. Vui lòng thử lại", "bottom", 3000)
  //     }
  //   })
  // }

  // retrySendEmail(retry, email, loading) {
  //   if (retry == 0) {
  //     loading.dismiss();
  //     this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
  //     return;
  //   }
  //   this.authenticationService.forgotPassword(email).subscribe(data => {
  //     if (data.status) {
  //       loading.dismiss();
  //       this.email = email;
  //       this.activationCode();
  //     } else {
  //       this.customService.toastMessage("Thất bại. Vui lòng thử lại", "bottom", 3000)
  //     }

  //   }, err => {
  //     this.retrySendEmail(--retry, email, loading)
  //   })
  // }

}
